import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    TextField,
    ListItemIcon,
    IconButton,
    Paper
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { LogIn } from '../actions'

class UserCart extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            alert : false,
            passwordError : false,
            selectedId : null,
            
        }
    } 

    handleDelete = (index) => {
        console.log(index)

        let tempCart = this.props.cart
        tempCart.splice(index, 1)

        // update data in database
        Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart : tempCart })
        .then(res => {
            console.log(res.data)

            // update data redux
            Axios.get(`http://localhost:2000/users/${this.props.id}`)
            .then(res => {
                console.log(res.data)
                this.props.LogIn(res.data)
            })
        })
        .catch(err => console.log(err))
    }

    handleEdit = (index) => {
        this.setState({

            editrow: index, count: this.props.cart[index].qty
        })
    }

    handleCheckOut = () => {
        console.log('check out')

        if (this.props.cart.length === 0) return
        
        this.setState({alert : true})
    }

    handleClose = () => {
        this.setState({alert : false})
    }

    handleSave = (index) => {
        let tempCart = this.props.cart;
        tempCart[index].qty = this.state.count;
        tempCart[index].total = tempCart[index].price * tempCart[index].qty
        Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
            cart: tempCart
        })
        .then ((res) => {
            Axios.get(`http://localhost:2000/users/${this.props.id}`).then(
            (res) => {
                this.props.LogIn(res.data);
                this.setState({editrow: null})
            }
            )
        })
        .catch ((err) => {
            console.log(err)
        })
    }

    handleCancel = (index) => {
        this.setState({editrow: null})
    }

    tambah = (index) => {
        let countEdit = this.state.count
        countEdit++
        this.setState({ count: countEdit})
    }
    kurang = (index) => {
        let countEdit = this.state.count
        countEdit--
        this.setState ({ count: countEdit})
        if(countEdit === 0) {
            this.delete(index);
            this.setState ({ editrow: null })
        }
    }

    handleOk = () => {
        console.log('user confirm')
        let history = {
            userID : this.props.id,
            date : new Date().toLocaleString(),
            total : this.props.cart.map(item => item.total).reduce((a, b) => a + b),
            products : this.props.cart
        }
        console.log(history)
        let tempPass = this.password.value;

        if (tempPass === this.props.password) {
            // update database
            Axios.post('http://localhost:2000/transaction_history', history) //history untuk ngepost ke history
            .then(res => {
                console.log(res.data)
                this.setState({alert : false})
                // update cart user => []
                Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart : [] }) //untuk ngosongin cartnya lagi
                .then(res => {
                    console.log(res.data)
    
                    // update data redux
                    Axios.get(`http://localhost:2000/users/${this.props.id}`)
                    .then(res => {
                        console.log(res.data)
                        this.props.LogIn(res.data)
                    })
                })
            })
            .catch(err => console.log(err))
        } else {this.setState({ passwordError: true })}
       
    }

    renderTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
        )
    }

    renderTableBody = () => {
        return this.props.cart.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell><img src={item.images} width='70px'/></TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    {/* <TableCell>{item.qty}</TableCell> */}
                    <TableCell>
                        {index === this.state.editrow? (
                            <div style={{display: "flex"}}>
                            <IconButton onClick={() => this.kurang(index)}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography>{this.state.count}</Typography>
                            <IconButton onClick={() => this.tambah(index)}>
                                <AddIcon />
                            </IconButton>
                            </div>
                        ) : (
                            <div>{item.qty}</div>
                        )}
                    </TableCell>
                    {/* <TableCell>Rp. {item.total.toLocaleString()}</TableCell> */}
                    <TableCell>
                            <div>
                                <IconButton onClick={ () => this.handleSave(index)}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={ () => this.handleCancel(index)}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        ) : (
                            <div>
                            <IconButton onClick={ () => this.handleDelete(index)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={ () => this.handleEdit(index)}>
                                <EditIcon />
                            </IconButton>
                            </div>
                        )}
                    </TableCell>
                    <TableCell>
                    </TableCell>
                </TableRow>
            )
        })
    }

    renderTableFooter = () => {
        let count = 0
        this.props.cart.map((item, index) => {
            count += item.total
        })

        return (
            <TableRow>
                <TableCell colSpan={6}></TableCell>
                <TableCell><Typography style={{ color: 'green' }}>Total Payment</Typography></TableCell>
                <TableCell><Typography style={{ color: 'green' }}> Rp. {count.toLocaleString()}</Typography></TableCell>
                {/* <TableCell>
                    <Button 
                        variant="contained" 
                        style={styles.buttonCheckOut}
                        onClick={this.handleCheckOut}
                    >
                        Check Out
                    </Button>
                </TableCell> */}
            </TableRow>
        )
    }

    render () {
        const { alert, passwordError } = this.state
        console.log(this.props.cart)
        return (
            <div style={styles.root}>
                <h1 style={styles.title}>User Cart</h1>
                <Table>
                    {this.renderTableHead()}
                    <TableBody>{this.renderTableBody()}</TableBody>
                    <TableFooter style={styles.tfoot}>{this.renderTableFooter()}</TableFooter>
                </Table>
                <Button 
                    variant="contained" 
                    style={styles.buttonCheckOut}
                    onClick={this.handleCheckOut}
                >
                    Check Out
                </Button>
                <Dialog
                    open={alert}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"💳 Confirmation"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to confrim this payment?
                    </DialogContentText>
                    {/* <TextField
                        inputRef={(password) => (this.password = password)}
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Input your password"
                        type="password"
                        fullWidth
                    /> */}
                    <TextField
                        label="Input password to confirm!"
                        inputRef={(password) => (this.password = password)}
                        error={passwordError}
                        helperText={passwordError ? "Incorrect password!" : null}
                        type="password"
                    />

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary" autoFocus>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const styles = {
    root : {
        height : 'calc(100vh - 70px)',
        backgroundColor : '#f2f2f2',
        padding : '90px 10% 3% 10%'
    },
    title : {
        margin : '2% 0px'
    },
    ul : {
        listStyle : 'none'
    },
    buttonCheckOut : {
        marginTop : '3%',
        color : 'white',
        backgroundColor : '#130f40'
    }
}

const mapStateToProps = (state) => {
    return {
        cart : state.user.cart,
        id : state.user.id,
        password : state.user.password
    }
}

export default connect(mapStateToProps, { LogIn })(UserCart)
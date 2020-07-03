import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core'

class HistoryTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         }
    }

    componentDidMount () {
        Axios.get('http://localhost:2000/transaction_history')
        .then (res => {
            console.log(res.data)
            this.setState({data: res.data})
        })
        .catch(err => console.log(err))
    }

    renderTableHead = () => {
        return (
            <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Users ID</TableCell>
                <TableCell>Date Trans.</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Products</TableCell>
            </TableRow>
        )
    }

    renderTableBody = () => {
        return this.state.data.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.userID}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.total}</TableCell>
                    <TableCell>
                        {item.products.map((aitem, indeks) => {
                            return (
                                <ul key={indeks} style={styles.ul}>
                                <li>Name : {aitem.name}</li>
                                <li>Brand : {aitem.brand}</li>
                                <li>Color : {aitem.color}</li>
                                <li>Size : {aitem.size}</li>
                                <li>Quantity : {aitem.qty}</li>
                                <li>Total : {aitem.total}</li>
                                </ul>
                            )
                        })}
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() { 
        return ( 
            <div style={styles.root}>
            <h1 style={styles.title}>Transaction History Users</h1>
            <Table>
                <TableHead>
                    {this.renderTableHead()}
                </TableHead>
                <TableBody>
                    {this.renderTableBody()}
                </TableBody>
            </Table>
            </div>
         );
    }
}

const styles = {
    root : {
        // minHeight: 'calc(100vh-70px)',
        height: 'calc(100vh-70px)',
        backgroundColor : '#f2f2f2',
        padding : '90px 10% 3% 10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    title : {
        margin : '2% 0px'
    },
    ul : {
        listStyle: 'none'
    }
}

const mapStateToProps = (state) => {
    console.log(state)
}
 
export default connect(mapStateToProps)(HistoryTransaction);
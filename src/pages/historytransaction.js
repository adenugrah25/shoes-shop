import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { getHistory } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Collapse,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";



class HistoryTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      opencollapse: false,
      cellId: null,
      order: "asc",
      item: "date"
    };
  }

  componentDidMount() {
    this.getProduct(this.state.item, this.state.order)
  }

  getProduct = ((item, order) => {
    Axios.get(`http://localhost:2000/transaction_history?_sort=${item}&_order=${order}`)
      .then((res) => {
        console.log(res.data);
        this.setState({item: item, order: order})
        this.props.getHistory(res.data);
      })
      .catch((err) => console.log(err));
  })

  handleOpen = () => {
    this.setState({ opencollapse: !this.state.opencollapse });
  };

  handleSortItem = (event) => {
    let item = event.target.value;
    this.getProduct(item, this.state.order);
    this.setState({ item: item })
    // Axios.get(`http://localhost:2000/users?sort=id&_order=${sortID}`)
    // then.((res) => this.props.)
  }

  handleSortOrder = (event) => {}

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Users ID</TableCell>
        <TableCell>Date Trans.</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>Action</TableCell>
        {/* <TableCell>Products</TableCell> */}
      </TableRow>
    );
  };

  renderTableBody = () => {
    const { opencollapse, cellId } = this.state;
    return this.props.history
      .slice(0)
      .reverse()
      .map((item, index) => {
        return (
          <TableBody>
            <TableRow>
              {/* <IconButton
                aria-label="expand row"
                size="small"
                onClick={() =>
                  this.setState({ opencollapse: !opencollapse, cellId: index })
                }
                open={opencollapse && cellId === index}
              >
                {opencollapse && cellId === index ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton> */}
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.userID}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>Rp. {item.total.toLocaleString()}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() =>
                  this.setState({ opencollapse: !opencollapse, cellId: index })}>
                  Details
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={5}
              >
                <Collapse
                  in={opencollapse && cellId === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box>
                    {/* <Typography variant="h6" gutterBottom component="div">
                      History Details
                    </Typography> */}
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.products.map((value) => {
                        return (
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{value.images[0]}</TableCell>
                            <TableCell>{value.name}</TableCell>
                            <TableCell>{value.brand}</TableCell>
                            <TableCell>{value.color}</TableCell>
                            <TableCell>{value.total}</TableCell>
                            <TableCell>{value.size}</TableCell>
                            <TableCell>{value.qty}</TableCell>
                            {/* <TableCell>
                              Rp. {value.total.toLocaleString()}
                            </TableCell> */}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      });
  };

  render() {

    const { order, item } = this.state;
    return (
      <div style={styles.root}>
        <h1 style={styles.title}>Transaction History Users</h1>
        <FormControl>
        <InputLabel id="sortid">Sort by</InputLabel>
        <Select
          labelId="sortt"
          // id="demo-simple-select"
          value={item}
          onChange={this.handleSortItem}
        >
          <MenuItem value="ID">ID</MenuItem>
          <MenuItem value="Time">Time</MenuItem>
          <MenuItem value="Total">Total</MenuItem>
        </Select>
        <Select
          labelId="order"
          // id="demo-simple-select"
          value={order}
          onChange={this.handleSortOrder}
          
        >
          <MenuItem value='asc'>Asc</MenuItem>
          <MenuItem value='desc'>Desc</MenuItem>
          {/* <MenuItem value={30}>Total</MenuItem> */}
        </Select>
      </FormControl>
        <Table style={styles.table}>
          <TableHead>{this.renderTableHead()}</TableHead>
          {this.renderTableBody()}
        </Table>
      </div>
    );
  }
}

const styles = {
  //   root: {
  //     // minHeight: 'calc(100vh-70px)',
  //     height: "calc(100vh-70px)",
  //     backgroundColor: "#f2f2f2",
  //     padding: "90px 10% 3% 10%",
  //     display: "flex",
  //     flexDirection: "column",
  //     justifyContent: "flex-end",
  //   },
  //   title: {
  //     margin: "2% 0px",
  //   },
  //   ul: {
  //     listStyle: "none",
  //   },
  root: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "15vh 0",
  },
  table: {
    width: "70vw",
  },
  card: {
    margin: "1% 0",
    padding: "2%",
    width: "100%",
  },
};

const mapStateToProps = (state) => {
  return {
    history: state.history,
  };
};

export default connect(mapStateToProps, { getHistory })(HistoryTransaction);

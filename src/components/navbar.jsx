import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Typography,
  Popover,
  Paper,
  Menu,
  Divider,
  MenuItem,
  Avatar
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import IconButton from '@material-ui/core/IconButton';
// import MailIcon from '@material-ui/icons/Mail';
// import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";

// import { LOGO } from "../assets";
import Profile from "./profile";
import AvatarProfile from "./avatar";
import { connect } from "react-redux";
// import { productReducer } from "../reducers/productReducer";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      logOutError: false,
    };
  }

  handlePopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: !this.state.open });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null, open: false });
  };

  renderPopOver = () => {
    return (
      <Popover
        id="mouse-over-popover"
        style={styles.popover}
        open={Boolean(this.state.anchorEl)}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={this.handlePopoverClose}
        disableRestoreFocus
      >
        <h3 style={{ textAlign: "center" }}>Cart({this.props.cart.length})</h3>
        <Divider />
        {this.props.cart.map((item) => {
          return (
            <div style={styles.cartPopOver}>
              <div style={{ margin: "auto" }}>
                <MenuItem>
                  <img src={item.images} width="100px" />
                </MenuItem>
                <MenuItem>{item.name}</MenuItem>
                <MenuItem>Rp. {item.total.toLocaleString()}</MenuItem>
                <MenuItem>Qty : {item.qty}</MenuItem>
                <Link to={`/cart`}>
                  <Button size="small" color="primary">
                    Go To Usercart
                  </Button>
                </Link>
              </div>
              <div>
                {/* <div style={{display:'flex', justifyContent: 'space-between'}}>
            </div> */}
              </div>
              <Divider />
            </div>
          );
        })}
      </Popover>
    );
  };

  render() {
    // console.log(this.props.data)
    let count = 0;
    this.props.cart.map((item) => {
      count += item.total;
    });
    return (
      <AppBar position="fixed" style={styles.root} elevation={0}>
        <Toolbar style={styles.toolbar}>
          <div style={styles.leftContent}>
            <img
              src={require("../assets/shoes_logo_2.png")}
              alt="logo"
              height="100%"
            />
            <Link to="/">
              <h1 style={styles.home}>Home</h1>
            </Link>
          </div>
          <div style={styles.rightContent}>
            <div style={styles.cart}>
              <IconButton
                aria-label="cart"
                onClick={(e) => this.handlePopoverOpen(e)}
              >
                <Badge badgeContent={this.props.cart.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {this.renderPopOver()}
              <h6 style={styles.cartTotal}>Rp. {count.toLocaleString()}</h6>
            </div>
            {this.props.username !== null ? (
              <AvatarProfile nama={this.props.username} />
            ) : (
              <Profile />
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = {
  root: {
    height: 90,
    padding: "2% 7%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(30, 39, 46, 0.3)",
    // flexGrow: 1,
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
  },

  leftContent: {
    height: "100%",
    flexBasis: "50%",
    maxWidth: "50%",
    // backgroundColor : 'yellow',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  home: {
    padding: "3%",
    fontSize: 20,
    cursor: "pointer",
    color: "white",
  },

  rightContent: {
    height: "100%",
    flexBasis: "50%",
    // backgroundColor : 'pink',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  cart: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    marginRight: 15,
  },

  cartTotal: {
    fontSize: 16,
    marginLeft: 15,
  },

  cartPopOver: {
    display: "flex",
  },

  link: {
    textDecoration: "none",
    paddingleft: "3%",
  },
  // menuButton: {
  //   marginRight: "2rem",
  //   padding: 0,
  //   color: "white",
  //   textTransform: "none",
  //   textDecoration: "none"
  // }

  // title: {
  //   flexGrow: 1,
  //   display:  "flex"
  // }
};
const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    cart: state.user.cart,
  };
};
export default connect(mapStateToProps)(Navbar);

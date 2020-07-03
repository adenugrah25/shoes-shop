import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  // Button,
  // IconButton,
  // Typography,
  Avatar
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import IconButton from '@material-ui/core/IconButton';
// import MailIcon from '@material-ui/icons/Mail';
// import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";

// import { LOGO } from "../assets";
import Profile from './profile'
import AvatarProfile from './avatar'
import { connect } from 'react-redux'
// import { productReducer } from "../reducers/productReducer";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    // console.log(this.props.data)
    return (
      <AppBar position="fixed" style={styles.root} elevation={0}>
        <Toolbar style={styles.toolbar}>
          <div style={styles.leftContent}>
            <img src={require('../assets/shoes_logo_2.png')} alt="logo" height="100%" />
            <Link to='/'><h1 style={styles.home}>Home</h1></Link>
            
          </div>
          <div style={styles.rightContent}>
            <div style={styles.cart}>
            <Badge badgeContent={this.props.cart.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
              <h6 style={styles.cartTotal}>Rp. 0</h6>
            </div>
            {this.props.username !== null ? <AvatarProfile nama={this.props.username}/> : <Profile />}
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
    backgroundColor : 'rgba(30, 39, 46, 0.3)'
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
    color: "white"
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

  link : {
    textDecoration : 'none',
    paddingleft : '3%'
  }
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
    username : state.user.username,
    cart : state.user.cart
  }
}
export default connect(mapStateToProps) (Navbar);

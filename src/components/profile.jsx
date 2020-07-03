import React from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    console.log(event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };
  render() {
    return (
      <div>
        <IconButton 
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(event) => this.handleClick(event)}>
          {/* <Avatar
            alt="Travis Howard"
            src={`https://api.adorable.io/avatars/285/${this.props.nama}.png`}
          ></Avatar> */}
          <Avatar src="/broken-image.jpg" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Link to="/login">
            <MenuItem>Login</MenuItem>
          </Link>
          <Link to="/register">
            <MenuItem>Register</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

// const styles = {
//     root : {

//     }
// }

export default Profile;

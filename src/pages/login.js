import React from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Axios from "axios";
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import {
  Paper,
  // CardContent,
  Typography,
  TextField,
  FormHelperText,
  // CardActions,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import { LOGO } from "../assets";

import { LogIn } from '../actions/'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      visible: false,
      loginError: false,
      user: null,
    };
  }

  handleLogin = () => {
    let username = this.username.value;
    let password = this.password.value;

    // //setelah diassign value, cek dulu valuenya dapat atau tidak pakai console log
    // console.log(username)
    // console.log(password)

    //get data user using login data
    Axios.get(
      `http://localhost:2000/users?username=${username}&password=${password}`
    )
      .then((res) => {
        console.log(res.data);

        //check error
        if (res.data.length === 0) {
          //cek panjang arraynya, kalo panjangnya 0 berarti array kosong
          this.setState({ loginError: true });
        } else {
          // kalau berhasil
          localStorage.setItem("id", res.data[0].id);
          this.props.LogIn(res.data[0])
          this.setState({loginError : false})
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { redirect, visible, loginError, user } = this.state; //object destruction / visible&loginError dipanggil sebagai variable
    console.log(user);
    // console.log(this.props.username)
    
    //redirect
    if (this.props.username.id !== null)  { //kalo property ID udah gak null baru ngeredirect
     
      return <Redirect to="/" />;
    }

    return (
      <div style={styles.root}>
        <Paper style={styles.paper} elevation={3}>
          <img src={require('../assets/shoes_logo_2.png')} alt="logo" width="300px" />
          <h3>Login Form</h3>
          <div style={styles.tfield}>
            {/* Input Username */}
            <AccountBoxIcon />
            <TextField
              required
              id="outlined-required"
              label="Email or Username"
              // defaultValue="Hello World"
              variant="outlined"
              inputRef={(username) => (this.username = username)} //buat ngambil value username
            />
            {/* INPUT PASSWORD */}
            <LockIcon />
            <FormControl required variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={visible ? "text" : "password"} //gak pakai this state karena sudah object destruction
                // value={values.password}
                inputRef={(password) => (this.password = password)} //buat ngambil value password
                helperText="Incorrect entry."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => this.setState({ visible: !visible })}
                    >
                      {visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              {/* kalo error helper textnya ditampilkan, kalau tdk maka yg ditampilkan string kosong */}
              <FormHelperText style={styles.errorHT}>
                {loginError ? "* Username or password is invalid" : ""}
              </FormHelperText>
            </FormControl>
          </div>
          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" />}
            label="Remember Me"
            labelPlacement="end"
          />
          <Button variant="outlined" color="default" onClick={this.handleLogin}>
            LOGIN
          </Button>
          <Link style={styles.link} to="/register">
            <Typography>Not a member? Sign up now</Typography>
          </Link>

          <Link style={styles.link} to="/forgotpass">
            <Typography>Forgot Password?</Typography>
          </Link>
        </Paper>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "calc(100vh - 70px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 88,
    backgroundImage: "url('../assets/forloginform.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    //   background: "linear-gradient(90deg, rgba(19,15,64,1) 15%, rgba(77,75,111,1) 66%, rgba(148,148,169,1) 85%, rgba(248,250,249,1) 100%)"
  },

  paper: {
    height: "75vh",
    width: "50vw",
    // opacity : "0.7",
    backgroundColor: "rgba(30, 39, 46, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1%" /*mendorong ke dalam*/,
  },
  // content: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // card: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   padding: 20,
  //   backgroundColor: "rgba(30, 39, 46, 0.3)"
  // },
  link: {
    color: "white",
    marginTop: "2%",
  },

  tfield: {
    margin: "1% 0",
    display: "flex",
    flexDirection: "column",
    color: "white",
  },

  errorHT: {
    color: "red",
  },
};

const mapStateToProps = (state) => {
  return {
    username : state.user
  }
}

export default connect(mapStateToProps, { LogIn })(Login);

import React from "react";
import {
  Button,
  Card,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Axios from "axios";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { Link, Redirect } from "react-router-dom";
// import FacebookIcon from '@material-ui/icons/Facebook';
// import { LOGO } from "../assets";
const URL = 'http://localhost:2000/'
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filter: [],
      checked: false,
      checkedText: "",
      showPassword: false,
      redirect: false,
      regStatus: false,
      errorUsername: false,
      errorEmail: false,
      errorPass: false,
      errorConfPass: false,
      errorTextUname:
        "Username must be at least 3 characters combination of letters and numbers.",
      errorTextEmail: "Example: yourmail@domain.com.",
      errorTextPass:
        "Password must be at least 6 characters combination of letters, numbers, and symbol.",
      errorTextConfPass: "Confirm password must be matched with password.",
      //   num: false,
      //   spec: false,
      //   char: false,
      //   passValid: false,
      //   unamelength: false
    };
  }

  componentDidMount() {
    this.getData("users");
  }

  getData = (address) => {
    Axios.get(URL + address)
      .then((response) => {
        if (address === "users") {
          this.setState({ users: response.data });
        } else {
          this.setState({ filter: response.data });
        }
      })
      .catch((error) => console.log(error));
  };

  handleUsername = (e) => {
    let username = e.target.value;
    let letter = /^([a-z]|[A-Z])/;
    let number = /[0-9]/;
    // let symbol = /[!@$%^*;]/;

    let letterTest = letter.test(username);
    let numberTest = number.test(username);
    // let symbolTest = symbol.test(username);
    let unameLength = username.length > 2;
    //   this.setState({ unamelength: unameValidation })

    console.log(this.state.users.filter((item) => item.username === username));
    if (username === "") {
      //validasi kalo usernamenya kosong
      this.setState({
        errorTextUname:
          "Username must be at least 3 characters combination of letters and numbers.",
        errorUsername: true,
      });
    } else if (
      this.state.users.filter((item) => item.username === username).length > 0
    ) {
      //validasi username jika sama / jika username sudah ada
      this.setState({
        errorTextUname:
          "Username is already exists. Please use a different username.",
        errorUsername: true,
      });
    } else if (letterTest && numberTest && unameLength) {
      //validasi kalo usernamenya benar / bisa digunakan
      this.setState({
        errorTextUname: "Correct username",
        errorUsername: false,
      });
    } else {
      //validasi kalo username salah / tdk bisa digunakan
      this.setState({
        errorTextUname: "Incorrect username",
        errorUsername: true,
      });
    }
  };

  handleEmail = (e) => {
      let email = e.target.value;
      let regexEmail = /^([a-z]|[0-9]|[A-Z])+([\.-]?([a-z]|[0-9]|[A-Z])+)*@([a-z]){2,}([\.]?[a-z]{2,})*(\.[a-z]{2,3})+$/
      let emailTest = regexEmail.test(email);

      //validasi
      if(email === '') { // kalau email kosong
        this.setState({errorTextEmail: 'Example: yourmail@domain.com.', errorEmail: true})
      } else if (this.state.users.filter(item=>item.email === email).length>0){ //validasi kalau email sudah ada / sudah teregister
          this.setState({errorTextEmail: 'Email is already exists. Please use a different email.', errorEmail: true})
      } else if (emailTest){ //validasi kalo emailnya sudah benar
          this.setState({errorTextEmail: 'Correct email', errorEmail: false})
      } else { //validasi kalo email error
          this.setState({errorTextEmail: 'Incorrect email', errorEmail: true})
      }
  };

  handlePass = (e) => {
    let password = e.target.value; //penampung password
    let upperCase = /[a-z]/;
    let lowerCase = /[A-Z]/;
    let number = /[0-9]/;
    let symbol = /[!@$%^*;]/;
    let lastIndex = /([a-z]|[A-Z]|[0-9])$/;

    let upperTest = upperCase.test(password);
    let lowerTest = lowerCase.test(password);
    let numberTest = number.test(password);
    let symbolTest = symbol.test(password);
    let lastIndexTest = lastIndex.test(password)
    let passLength = password.length > 5

    //validasi
    if (password === false) { //kalau password tdk memenuhi syarat
        this.setState({errorTextPass: 'Password must be at least 6 characters combination of letters, numbers, and symbol.', errorPass: true})
    } else if (upperTest && lowerTest && numberTest && symbolTest && lastIndexTest && passLength){ //validasi jika passnya benar
        this.setState({errorTextPass: 'Correct password.', errorPass: false})
    } else { //validasi kalau passwordnya salah
        this.setState({errorTextPass: 'Incorrect password', errorPass: true})
    }
  }

  handleConfPass = (e) => {
      let confPass = e.target.value;
      let pass = this.password.value;
      console.log(pass)

      if(confPass === false) { //validasi ketika confirmasi password tdk sama dgn password
          this.setState({errorTextConfPass: 'Confirm password must be matched with password.', errorConfPass: true })
      } else if (confPass=== pass) { //validasi ketika confirm passwordnya sama
          this.setState({errorTextConfPass: 'Confirm password already match.', errorConfPass: false})
      } else {
          this.setState({errorTextConfPass: 'Confirm password doesn\'t match.', errorConfPass: true})
      }
  }

  handleClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleRegist = () => {
      console.log('masuk')
    const {errorUsername, errorEmail, errorPass, errorConfPass} = this.state;
    


    let username = this.username.value;
    let email = this.email.value;
    let password = this.password.value;
    let confirmPassword = this.confirmPassword.value;
    // let role = "user";
    //setelah assign value tambahkan innerRef

    // //check valuenya dapat atau tidak
    console.log({user: username, email: email, password: password, confirmPassword: confirmPassword})
    console.log(errorUsername, errorEmail, errorPass, errorConfPass)

    if (username !== "" && email !== "" && password !== "" && confirmPassword !== '') {
    //   alert("Please input all the form");
    console.log(!errorUsername)
        if(!errorUsername && !errorEmail && !errorPass && !errorConfPass){
            Axios.post("http://localhost:2000/users", {
              username: username,
              password: password,
              role: 'user',
              email: email,
              cart: []
            })
              .then((res) => {
                console.log(res.data);
                this.setState({ users: res.data, regStatus: true, redirect: true });
              })
              .catch((error) => console.log(error));
              console.log(this.state.users)
              this.setState({checkedText: ''})
        }

    } else {
        this.setState({checkedText: 'Input incorrect. Please try again'})
    
      }
    }
  

  render() {
    const { showPassword, redirect, checked, checkedText, errorTextUname, errorUsername, errorTextEmail, errorEmail, errorPass, errorTextPass, errorConfPass, errorTextConfPass } = this.state;
    //diketik redirect aja karena tipe datanya Boolean
    if (redirect) return <Redirect to="/login" />;
    return (
      <form>
        <div style={styles.root}>
          <Card style={styles.card}>
            <img
              src={require("../assets/shoes_logo_2.png")}
              alt="logo"
              width="300px"
            />
            <h3>Register Form</h3>
            <div style={{ margin: "5px" }}>
              <Typography>Username</Typography>
              <TextField
                required
                id="outlined-multiline-flexible"
                label="Username"
                multiline
                rowsMax={4}
                placeholder="Your username..."
                variant="outlined"
                error={errorUsername}
                inputRef={(username) => this.username = username} //buat ngambil value username
                onChange={(e) => this.handleUsername(e)}
                InputProps={{startAdornment:<InputAdornment position="start"><PersonIcon/></InputAdornment>}}
                aria-describedby="outlined-weight-helper-text"
                // helperText="Incorrect entry."
                // error={!this.state.unamelength}
                // value={value}
               
              />
              {/* {this.helperTextUname()} */}
              <FormHelperText
                id="outlined-weight-helper-text"
                style={errorUsername ? styles.error : styles.default}
              >
                {errorTextUname}
              </FormHelperText>
            </div>
            <div style={{ margin: "5px" }}>
              <Typography>Email</Typography>
              <TextField
                required
                id="outlined-multiline-flexible"
                label="Email"
                multiline
                rowsMax={4}
                placeholder="Your email..."
                inputRef={(email) => this.email = email} //buat ngambil value email
                onChange={(e) => this.handleEmail(e)}
                error={errorEmail}
                InputProps={{startAdornment:<InputAdornment position="start"><EmailIcon/></InputAdornment>}}

                
                // aria-describedby="outlined-weight-helper-text"
                // value={value}
                
                variant="outlined"
              />
              <FormHelperText 
                id="outlined-weight-helper-text"
                style={errorEmail? styles.error: styles.default}>
                {errorTextEmail}
              </FormHelperText>
            </div>
            <div style={{ margin: "5px" }}>
              <Typography>Password</Typography>
              <FormControl required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  // value={values.password}
                  error = {errorPass}
                  inputRef={(password) => this.password = password} //buat ngambil value password
                  onChange={(e) => this.handlePass(e)}
                  startAdornment = {<InputAdornment position="start"><LockIcon/></InputAdornment>}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => this.handleClick()}>
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {/* {this.printHelperText()} */}
                <FormHelperText 
                    id="outlined-weight-helper-text"
                    style={errorPass? styles.error: styles.default}>
                    {errorTextPass}
                </FormHelperText>
              </FormControl>
            </div>
            <div style={{ margin: "5px" }}>
              <Typography>Re-type your password</Typography>
              <FormControl required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  // value={values.password}
                  error = {errorConfPass}
                  inputRef={(confirmPassword) => this.confirmPassword = confirmPassword} //buat ngambil value password
                  onChange={(e) => this.handleConfPass(e)}
                  startAdornment = {<InputAdornment position="start"><LockIcon/></InputAdornment>}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => this.handleClick()}>
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText 
                    id="outlined-weight-helper-text"
                    style={errorConfPass? styles.error: styles.default}>
                    {errorTextConfPass}
                </FormHelperText>
                {/* {this.printHelperText()} */}
              </FormControl>
            </div>
            <Button variant="contained" color="primary" onClick={this.handleRegist}>
              SUBMIT
            </Button>
          </Card>
        </div>
      </form>
    );
  }
}

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //   background: "linear-gradient(90deg, rgba(19,15,64,1) 42%, rgba(196,232,218,1) 100%)"
    //   background: "linear-gradient(90deg, rgba(1,32,134,1) 7%, rgba(11,215,137,1) 100%)"
    background:
      "linear-gradient(90deg, rgba(19,15,64,1) 15%, rgba(77,75,111,1) 66%, rgba(148,148,169,1) 85%, rgba(248,250,249,1) 100%)",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "rgba(30, 39, 46, 0.3)",
  },

  error: {
    color: "#f44336",
  },

  default: {
    color: "#bdbdbd",
  },
};

export default Register;

// import React from 'react'
// import {
//     Button,
//     Checkbox,
//     Typography,
//     InputAdornment,
//     IconButton,
//     FormControl,
//     OutlinedInput,
//     FormHelperText
//  } from '@material-ui/core'

// import {Link, Redirect} from 'react-router-dom'
// import PersonIcon from '@material-ui/icons/Person';
// import LockIcon from '@material-ui/icons/Lock';
// import EmailIcon from '@material-ui/icons/Email';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import FacebookIcon from '@material-ui/icons/Facebook';

// // import {LOGO} from '../assets'
// import Axios from 'axios';

// const URL = 'http://localhost:2000/'

// class Register extends React.Component {
//     constructor(props){
//         super(props)
//             this.state = {
//                 users: [],
//                 filter: [],
//                 checked: false,
//                 checkedText: '',
//                 showPassword:false,
//                 regStatus: false,
//                 errorUsername : false,
//                 errorEmail : false,
//                 errorPass : false,
//                 errorConfPass : false,
//                 redirect : false,
//                 errorTextUsername : 'Username must be at least 6 characters combination of letters and numbers.',
//                 errorTextEmail : 'Example: yourmail@domain.com.',
//                 errorTextPass : 'Password must be at least 6 characters combination of letters, numbers, and symbol.',
//                 errorTextConfPass : 'Confirm password must be matched with password.'
//             }
//     }

//     componentDidMount() {
//         this.getData('users')
//     }

//     getData = (address) => {
//         Axios.get(URL + address)
//         .then(response => {
//             if(address === 'users'){
//                 this.setState({users: response.data})
//             } else {
//                 this.setState({filter: response.data})
//             }
//             console.log(response.data)
//         })
//         .catch(error => console.log(error))
//     }

//     handleUsername = (event) => {
//         let username = event.target.value
//         let letter = /^([a-z]|[A-Z])/
//         let number = /[0-9]/
//         let symbol = /[!@$%^*;]/

//         console.log(username)
//         console.log(Boolean(username))

//         let letterTest = letter.test(username)
//         let numberTest = number.test(username)
//         let symbolTest = !symbol.test(username)
//         let minUser = username.length > 5

//         console.log((this.state.users.filter(item=>item.username === username)))
//         if(username === ''){
//             this.setState({errorTextUsername: 'Username must be at least 6 characters combination of letters and numbers', errorUsername: true})
//         } else if(this.state.users.filter(item=>item.username === username).length>0){
//             this.setState({errorTextUsername: 'Username is already use', errorUsername: true})
//         } else if(letterTest && numberTest && symbolTest && minUser){
//             this.setState({errorTextUsername: 'Correct username', errorUsername: false})
//         } else {
//             this.setState({errorTextUsername: 'Incorrect username.', errorUsername: true})
//         }
//     }

//     handleEmail = (event) => {
//         let email = event.target.value
//         let regexEmail = /^([a-z]|[0-9]|[A-Z])+([\.-]?([a-z]|[0-9]|[A-Z])+)*@([a-z]){2,}([\.]?[a-z]{2,})*(\.[a-z]{2,3})+$/
//         let emailTest = regexEmail.test(email)

//         if(email === ''){
//             this.setState({errorTextEmail: 'Example: yourmail@domain.com', errorEmail: true})
//         } else if(this.state.users.filter(item=>item.email === email).length>0){
//             this.setState({errorTextEmail: 'Email is already use', errorEmail: true})
//         } else if(emailTest){
//             this.setState({errorTextEmail: 'Correct email', errorEmail: false})
//         } else {
//             this.setState({errorTextEmail: 'Incorrect email.', errorEmail: true})
//         }
//     }

//     handlePass = (event) => {
//         let password = event.target.value
//         let upperCase = /[a-z]/
//         let lowerCase = /[A-Z]/
//         let number = /[0-9]/
//         let symbol = /[!@$%^*;]/
//         let lastIndex = /([a-z]|[A-Z]|[0-9])$/

//         let upperTest = upperCase.test(password)
//         let lowerTest = lowerCase.test(password)
//         let numberTest = number.test(password)
//         let symbolTest = symbol.test(password)
//         let lastIndexTest = lastIndex.test(password)
//         let minPass = password.length > 5

//         if(password === false){
//             this.setState({errorTextPass:'Password must be at least 6 characters combination of letters, numbers, and symbol.', errorPass: true})
//         } else if(upperTest && lowerTest && numberTest && symbolTest && lastIndexTest && minPass){
//             this.setState({errorTextPass: 'Correct password.', errorPass: false })
//         } else{
//             this.setState({errorTextPass: 'Incorrect password', errorPass: true })
//         }
//     }

//     handleConfPass = (event) => {
//         let confPass = event.target.value
//         let pass = this.password.value
//         console.log(pass)

//         if(confPass === false){
//             this.setState({errorTextConfPass: 'Confirm password must be matched with password.', errorConfPass: true })
//         } else if(confPass === pass){
//             this.setState({errorTextConfPass: 'Confirm password already match.', errorConfPass: false })
//         } else{
//             this.setState({errorTextConfPass: 'Confirm password doesn\'t match.', errorConfPass: true })
//         }
//     }

//     handleRegister = () =>{
//         let {errorUsername, errorEmail, errorPass, errorConfPass, checked} = this.state

//         let username = this.username.value,
//         email = this.email.value,
//         password = this.password.value,
//         confirmPassword = this.confirmPassword.value

//         console.log({user: username, email: email, password:password, confirmPassword:confirmPassword})

//         if(username!== '' && email !== '' && password !== '' && confirmPassword!=='' && checked){
//             if(!errorUsername && !errorEmail && !errorPass && !errorConfPass){
//                 Axios.post('http://localhost:2000/users',{
//                     username: username,
//                     password: password,
//                     role: 'user',
//                     email: email
//                 }) .then(response => {
//                     console.log(response.data)
//                     this.setState({users: response.data, regStatus: true})
//                 }) .catch(error => {
//                     console.log(error)
//                 })
//                 console.log(this.state.users)
//                 this.setState({checkedText: ''})
//             }
//         } else{
//                 this.setState({checkedText: 'Your input incorrect. Please try again!'})
//             }

//     }

//     render(){
//         const {
//             showPassword,
//             checked,
//             checkedText,
//             errorTextUsername,
//             errorTextEmail,
//             errorTextPass,
//             errorTextConfPass,
//             errorUsername,
//             errorEmail,
//             errorPass,
//             errorConfPass,
//             redirect
//         } = this.state
//         console.log(this.state.checked)

//         //redirect
//         if (redirect) {
//             return <Redirect to='/login'/>
//         }

//         return (
//             <div style={styles.root}>
//                 <Link to='/'>
//                     {/* <img src={LOGO} alt="logo"height='60vh'/> */}
//                 </Link>
//                 <div style={styles.containerRegister}>
//                     <Typography variant='h5' style={{marginBottom: '2vw'}}>Register Form</Typography>
//                     {/* <div style={styles.register}> */}
//                     <FormControl variant="outlined" style={styles.regInput}>
//                         <OutlinedInput
//                             id="outlined-adornment-weight"
//                             placeholder='Username'
//                             error={errorUsername}
//                             inputRef={(username) => this.username = username}
//                             onChange = {(e) => this.handleUsername(e)}
//                             startAdornment = {<InputAdornment position="start"><PersonIcon/></InputAdornment>}
//                             aria-describedby="outlined-weight-helper-text"
//                             inputProps={{
//                             'aria-label': 'weight'
//                             }}
//                             labelWidth={0}
//                         />
//                         <FormHelperText
//                             id="outlined-weight-helper-text"
//                             style={errorUsername? styles.error: styles.default}>
//                                 {errorTextUsername}
//                         </FormHelperText>
//                     </FormControl>
//                     <FormControl variant="outlined" style={styles.regInput}>
//                         <OutlinedInput
//                             id="outlined-adornment-weight"
//                             placeholder='Email'
//                             error = {errorEmail}
//                             inputRef={(email) => this.email = email}
//                             onChange = {(e) => this.handleEmail(e)}
//                             startAdornment = {<InputAdornment position="start"><EmailIcon/></InputAdornment>}
//                             aria-describedby="outlined-weight-helper-text"
//                             inputProps={{
//                             'aria-label': 'weight'
//                             }}
//                             labelWidth={0}
//                         />
//                         <FormHelperText
//                             id="outlined-weight-helper-text"
//                             style={errorEmail? styles.error: styles.default}>
//                                 {errorTextEmail}
//                         </FormHelperText>
//                     </FormControl>
//                     <FormControl variant="outlined" style={styles.regInput}>
//                         <OutlinedInput
//                             id="outlined-adornment-weight"
//                             placeholder='Password'
//                             error = {errorPass}
//                             inputRef={(password) => this.password = password}
//                             onChange = {(e) => this.handlePass(e)}
//                             type = {showPassword? 'text' : 'password'}
//                             startAdornment = {<InputAdornment position="start"><LockIcon/></InputAdornment>}
//                             endAdornment = {<IconButton position="end" onClick={() => this.setState({showPassword: !showPassword})}>
//                                                 {showPassword ? <VisibilityOff/> : <Visibility/>}
//                                             </IconButton>}
//                             aria-describedby="outlined-weight-helper-text"
//                             inputProps={{
//                                 'aria-label': 'weight'
//                             }}
//                             labelWidth={0}
//                         />
//                         <FormHelperText
//                             id="outlined-weight-helper-text"
//                             style={errorPass? styles.error: styles.default}>
//                                 {errorTextPass}
//                         </FormHelperText>
//                     </FormControl>
//                     <FormControl variant="outlined" style={styles.regInput}>
//                         <OutlinedInput
//                             id="outlined-adornment-weight"
//                             placeholder='Confirm Password'
//                             error = {errorConfPass}
//                             inputRef={(confirmPassword) => this.confirmPassword = confirmPassword}
//                             onChange = {(e) => this.handleConfPass(e)}
//                             type = {showPassword? 'text' : 'password'}
//                             startAdornment = {<InputAdornment position="start"><LockIcon/></InputAdornment>}
//                             endAdornment = {<IconButton position="end" onClick={() => this.setState({showPassword: !showPassword})}>
//                                                 {showPassword ? <VisibilityOff/> : <Visibility/>}
//                                             </IconButton>}
//                             aria-describedby="outlined-weight-helper-text"
//                             inputProps={{
//                             'aria-label': 'weight'
//                             }}
//                             labelWidth={0}
//                         />
//                         <FormHelperText
//                             id="outlined-weight-helper-text"
//                             style={errorConfPass? styles.error: styles.default}>
//                                 {errorTextConfPass}
//                         </FormHelperText>
//                     </FormControl>
//                         {/* <div style={styles.rule}>
//                             <Checkbox
//                                 name="checkedB"
//                                 color="primary"
//                                 inputRef = {(checked) => this.checked = checked}
//                                 onClick = {() => this.setState({checked: !checked})}
//                             />
//                             <Typography component= "body2" variant="p">
//                                 By signing up, you agree to our
//                                 <Link style={styles.ruleContent}> Terms of Use </Link>
//                                 and
//                                 <Link style={styles.ruleContent}> Privacy Policy. </Link>
//                             </Typography>
//                         </div>
//                         <FormHelperText style={styles.error}>{checkedText}</FormHelperText> */}
//                         <Button variant="contained" color="primary" style={{width: '70%'}} onClick={() => this.handleRegister()}>Register</Button>
//                     {/* </div> */}
//                 </div>
//                 {/* <div style={styles.optionContainer}>
//                 <Button variant="contained" color="secondary" startIcon={<FacebookIcon/>} style={styles.optionRegister}>Register with Facebook</Button>
//                 <Button variant="contained" color="primary" startIcon={<i class="fa fa-google" aria-hidden="true"></i>}style={styles.optionRegister}>Register with Google</Button>
//                 <Typography
//                         component= "body2"
//                         variant="p"
//                         align = 'center'
//                 >
//                     Already have an account?&nbsp; */}
//                     <Link to='/login' style={styles.login}>
//                         Log in
//                     </Link>
//                 {/* </Typography>
//                 </div> */}
//             </div>
//         )
//     }
// }

// const styles = {
//     root: {
//         width:'100%',
//         height: 'auto',
//         display: 'flex',
//         padding: '1vw 0',
//         justifyContent:'center',
//         flexDirection: 'column',
//         alignItems: 'center'
//     },
//     containerRegister: {
//         height:'90vh',
//         width:'35vw',
//         display: 'flex',
//         justifyContent:'center',
//         flexDirection: 'column',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         marginBottom: '2vw',
//         borderBottom: '1px solid darkgray'
//     },
//     regInput:{
//         width:'70%',
//         marginBottom: '1vw',
//     },
//     rule: {
//         width:'70%',
//         display: 'flex',
//         marginBottom: '1vw',
//         justifyContent: 'center',
//         alignItem: 'center'
//     },
//     ruleContent:{
//         color: '#f44336',
//         textDecoration: 'none'
//     },
//     login: {
//         color: '#f44336',
//         textDecoration: 'none',
//         fontWeight: 'bold'
//     },
//     optionRegister:{
//         width: '25vw',
//         backgroundColor: '#f5f5f5',
//         color: 'black'
//     },
//     optionContainer:{
//         height:'20vh',
//         display: 'flex',
//         justifyContent: 'space-around',
//         flexDirection: 'column'
//     },
//     error:{
//         color: '#f44336'
//     },
//     default:{
//         color: '#bdbdbd'

//     }
// }

// export default Register

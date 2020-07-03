import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Route, Switch } from "react-router-dom";
import Axios from "axios";
import Home from "./pages/homepage";
import Category from "./pages/category";
import Profile from "./components/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductDetails from "./pages/productDetails";
import UserCart from "./pages/userCart";
import AdminPage from "./pages/admin.js";
import { connect } from "react-redux";
import { LogIn, LogOut } from "./actions";
import HistoryTransaction from "./pages/historytransaction";
import ProfileUser from "./pages/profileuser";
import HistoryUser from "./pages/historyuser";
import NotFound from "./pages/404";

const URL = "http://localhost:2000";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keepLoginUser: {},
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/users?id=${localStorage.getItem("id")}`)
      .then((res) => {
        this.props.LogIn(res.data[0]);
      })
      .catch((err) => console.log(err));
  }

  // keeplogin = () => {
  //   let token = localStorage.getItem("loginRunner"); //ambildata
  //   if (token) {
  //     Axios.get(URL + `/users?id=${token}`)
  //       .then((res) => {
  //         localStorage.setItem("loginRunner", res.data[0].id); //kalo login berhasil, local storage terupdate
  //         // this.setState({ keepLoginUser: res.data[0] }); //data disimpan kesini
  //         this.props.LogIn(res.data[0]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // handleLogout = () => {
  //   localStorage.removeItem("loginRunner");
  //   this.props.logout();
  // };

  render() {
    if (this.props.role === "admin") {
      return (
        <div>
          <Navbar data={this.state.keepLoginUser} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/historytransaction" component={HistoryTransaction} />
            <Route path='/productdetails' component={ProductDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Navbar data={this.state.keepLoginUser} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profileuser" component={ProfileUser} />
            <Route path="/cart" component={UserCart} />
            <Route path="/historyuser" component={HistoryUser} />
            <Route path='/productdetails' component={ProductDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      );
    }
  }
}

const mapToProps = (state) => {
  return { role: state.user.role };
};

export default connect(mapToProps, { LogIn })(App);

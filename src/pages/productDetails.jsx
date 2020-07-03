import React from "react";
import Axios from "axios";
import Slider from "react-slick";
import {
  StylesProvider,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { LogIn } from '../actions'
// import StorefrontIcon from '@material-ui/icons/Storefront';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      image: "",
      stock: null,
      toLogin: false,
      selectedSize: null,
      total: 0,
      size: null,
      toCart: false,
      alert: false,
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/products${this.props.location.search}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ product: res.data[0], image: res.data[0].images });
      })
      .catch((err) => console.log(err));
  }

//   handleMinusQty = () => {
//     this.quantity.value--;
//   };

//   handlePlusQty = () => {
//       if (this.quantity.value >= this.state.stock){
//           this.quantity.disabled = true
//       } else {
//           this.quantity.value++;
//           this.quantity.disabled = false
//       }
//   };

  handleAddToCart = () => {
    const { total, product, size } = this.state;

    // check user input => kalo user blm input keluar alert
    let qty = parseInt(this.quantity.value)
    console.log(qty)
    if (size === null || qty === 0) {
      this.setState({ alert: true });
      return;
    }

    //check if user already login
    if (!this.props.id) {
      //user blm login
      this.setState({ toLogin: true });
    } else {
      console.log("user already login");
      let cartData = {
        name: product.name,
        brand: product.brand,
        color: product.colour,
        size: size,
        qty: qty,
        total: qty * product.price,
      };

      let tempCart = this.props.cart;
      tempCart.push(cartData);

      // update user cart in database
      Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
        cart: tempCart,
      })
        .then((res) => {
          console.log(res.data);

          // update data redux
          Axios.get(`http://localhost:2000/users?id=${this.props.id}`).then(
            (res) => {
              this.props.LogIn(res.data[0]);
              this.setState({ toCart: true });
            }
          );
        })
        .catch((err) => console.log(err));
    }
  };

  handleClose = () => {
    this.setState({ alert: false });
  };

  renderItems = () => {
    return (this.state.image || []).map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ backgroundImage: `url(${item})`, ...styles.content }}
          ></div>
        </div>
      );
    });
  };

  render() {
      
    const {
      product,
      image,
      stock,
      toLogin,
      selectedSize,
      total,
      size,
      toCart,
      alert,
    } = this.state;

    console.log(total)

    if (toLogin) {
      return <Redirect to="/login" />;
    } else if (toCart) {
      return <Redirect to="/cart" />;
    }

    return (
      <div style={styles.root}>
        {/* <Paper elevation={3} style={{backgroundImage : `url(${image})`,...styles.leftContent}}></Paper> */}
        <div style={styles.leftContent}>
          <Slider {...settings} style={styles.slider}>
            {this.renderItems()}
          </Slider>
        </div>
        <div style={styles.rightContent}>
          <h1 style={styles.info}>{product.name}</h1>
          {/* <h1 style={styles.info}>Category : {product.category}</h1>
                <h1 style={styles.info}>Brand : {product.brand}</h1> */}
          <h1 style={styles.info}>Colour : {product.colour}</h1>
          <h1 style={styles.info}>Description :</h1>
          <h1 style={styles.desc}>{product.description}</h1>
          <h1 style={styles.info}>Size :</h1>
          <div>
            {(product.stock ? product.stock : []).map((item, index) => {
              return (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => this.setState({ stock: item.total, size: item.code })}
                  style={{
                    backgroundColor: selectedSize === index ? "#130f40" : "",
                    color: selectedSize === index ? "white" : "black",
                    ...styles.sizeButton,
                  }}
                >
                  {item.code}
                </Button>
              );
            })}
          </div>
          <h5>{stock ? `stock = ${stock}` : ""}</h5>
          <h1 style={styles.info}>Total : </h1>
          <div style={styles.inputQty}>
            <Button
              style={styles.buttonPM}
              disabled={total <= 0 ? true : false}
              onClick={() => this.quantity.value--}
            >
              -
            </Button>
            <OutlinedInput
              // id="username"
              
              inputRef={(quantity) => this.quantity = quantity}
              type="text"
              style={styles.inputoutline}
              onChange={() => this.quantity.value !== null ? this.setState({total: this.quantity.value}) : null}
            />
            <Button
              style={styles.buttonPM}
              disabled={total >= stock ? true : false}
              onClick={() => this.quantity.value++}
            >
              +
            </Button>
          </div>
          {/* <div style={styles.total}>
            <Button
              disabled={total <= 0 ? true : false}
              onClick={() => this.setState({ total: total - 1 })}
            >
              -
            </Button>
            <h1 style={styles.totalInfo}>{total}</h1>
            <Button
              disabled={total >= stock ? true : false}
              onClick={() => this.setState({ total: total + 1 })}
            >
              +
            </Button>
          </div> */}
          <Button style={styles.button} onClick={this.handleAddToCart}>
            Add to Cart
          </Button>
        </div>
        <Dialog
          open={alert}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"⚠ Warning !"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please choose your size, look at the stock if its avaiable, and
              input total or quantity min = 1.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "ease",
  fade: true,
  appendDots: (dots) => {
    return (
      <div style={styles.dots}>
        <ul>{dots}</ul>
      </div>
    );
  },
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const styles = {
  root: {
    height: "calc(100vh - 70px)",
    backgroundColor: "#f2f2f2",
    padding: "120px 10% 3% 10%",
    display: "flex",
    alignItems: "center",
  },
  leftContent: {
    height: "30vw",
    flexBasis: "45%",
    backgroundColor: "white",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "center",
    zIndex: 5,
  },
  rightContent: {
    height: "96%",
    flexBasis: "50%",
    backgroundColor: "white",
    padding: "3%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  info: {
    fontSize: 22,
    marginBottom: "2%",
    fontWeight: 200,
    textTransform: "capitalize",
  },
  desc: {
    fontSize: 14,
    marginBottom: "2%",
    fontWeight: 100,
  },
  button: {
    // backgroundColor : '#130f40',
    backgroundColor: "#48C9B0",
    color: "white",
    width: "30%",
    alignSelf: "flex-end",
    marginTop: "5%",
    position: "absolute",
    bottom: "5%",
  },

  buttonPM: {
    backgroundColor: "#48C9B0",
    color: "white",
    width: "5%",
    bottom: "5%",
  },

  buttonSize: {
    margin: 1,
  },
  slider: {
    height: "100%",
    width: "30vw",
    backgroundColor: "white",
    position: "relative",
  },
  next: {
    position: "absolute",
    right: "7%",
    top: "45%",
    zIndex: 3,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  previous: {
    position: "absolute",
    left: "7%",
    top: "45%",
    zIndex: 3,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  dots: {
    // backgroundColor : 'green',
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    height: 30,
  },

  content: {
    backgroundColor: "red",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "50vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5% auto",
  },
  title: {
    fontSize: 64,
    color: "white",
    textTransform: "capitalize",
    marginButton: 20,
  },

  inputQty: {
    display: "flex",
    color: "white",
    width: "50%",
    alignSelf: "flex-start",
    // marginTop : '5%',
    position: "absolute",
    bottom: "5%",
    margin: 4,
  },
  inputoutline: {
    width: 50,
  },
  stockInfo: {
    margin: "2%",
    color: "red",
    fontSize: 16,
  },
  total: {
    display: "flex",
    alignItems: "center",
  },
  totalInfo: {
    margin: "0px 2%",
  },
};

function NextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton style={styles.next} onClick={onClick}>
      <NavigateNextIcon />
    </IconButton>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton style={styles.previous} onClick={onClick}>
      <NavigateBeforeIcon />
    </IconButton>
  );
}
const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    cart: state.user.cart,

  };
};

//gak perlu action karena ambil data doang
export default connect(mapStateToProps, { LogIn })(ProductDetails);

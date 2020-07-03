import React from 'react'
import Axios from 'axios'
import {Card, CardActionArea, CardMedia, Typography, Button, CardActions, CardContent} from '@material-ui/core'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getProduct } from '../actions' //yg dipanggil nama dari export constnya productAction

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            // products : [] //dikomen kalo sudah pake redux
         }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/products`)
        .then(res => {
            console.log(res.data)
            //this.props fungsinya buat ngirim data ke action, lalu diteruskan ke reducer melalui payload action
            this.props.getProduct(res.data) // disesuaikan dgn kebutuhan data, ini tipenya array of object. (Kalo butuh array ke object ga butuh data[0], kalo butuh object baru perlu diakses index)
            //ini dicomment kalau sudah pake redux
            // this.setState({products : res.data}) //ini kalau penyimpanannya di localstorage
        })
        .catch(error => console.log(error))
    }

    renderCard = () => {
        return this.props.product.map((item, index) => {
            return (
                <Card style={styles.card} key={item.id}>
                  <CardActionArea style={styles.contentArea}>
                    <CardMedia image={item.images[0]} component="img" style={styles.contentImage}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                       {`Rp ${item.price}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={styles.contentAction}>
                    <Link to={`/productdetails?id=${item.id}`}>
                        <Button size="small" color="primary">
                            Buy Now
                        </Button>
                    </Link>
                    <Button size="small" color="secondary">
                      Wish List
                    </Button>
                  </CardActions>
                </Card>
              );
        }
        )
    }
    render() { 
        return ( 
            <div style={styles.root}>
                <h1 style={styles.title}>Products</h1>
                <div style={styles.cardContainer}>
                    {this.renderCard()}
                </div>
            </div>
         );
    }
}

const styles = {
    root : {
        height : 'auto',
        width : '100%',
        backgroundColor : '#f2f2f2',
        padding : '2% 7%'
    },
    title : {
        fontSize : 50,
        fontWeight : 600,
        margin : '2% 0px'
    },

    cardContainer : {
        width : '100%',
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'flex-start'
    },

    card : {
        flexBasis : '19%', //baergantung pada container
        minWidth : '300px',
        marginBottom : '1%',
        marginRight : '1%'
    },

    contentArea : {
        height : '87%',
        padding : '1%'
    },

    contentImage : {
        width : '100%',
        padding : '5%'
    },
    
    contentActions : {
        height : '13%', //sisa dari 87%
        alignItems : 'center'
    }
}

//buat ambil dari reducer
const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}
 
export default connect(mapStateToProps, {getProduct}) (Products);
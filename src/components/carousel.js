import React from 'react';
import Slider from 'react-slick'
import Axios from 'axios'
import {IconButton, Button} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { connect } from 'react-redux' //penyambung
import {getDataCarousel} from '../actions'  
    
class Carousel extends React.Component {
    // constructor (props) {
    //     super(props)
    //     this.state ={
    //         data : [] //array dan object
    //     }
    // }

    componentDidMount () {
        Axios.get('http://localhost:2000/slider')
        .then(response => {
            console.log(response.data)
            // this.setState({data : response.data})
            this.props.getDataCarousel(response.data) //nyambungin data ke Redux
        })
        .catch(error => console.log(error))
    }

    renderItems =  () => {
        return this.props.data.map((item, index) =>{

            return(
                <div key={index}>
                    <div style={{backgroundImage : `url(${item.images})`, ...styles.content}}>
                        <h1 style={styles.title}>{item.title}</h1>
                        <Button startIcon={<StorefrontIcon/>} style={styles.button}>Shop Now</Button>
                       </div>
                </div>

            )
        })
    }

    render() { 
        const settings = {
            dots: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay : true,
            autoplaySpeed : 3000,
            cssEase : "ease",
            fade : true,
            appendDots : dots => {
                return (
                    <div style={styles.dots}>
                        <ul>{dots}</ul>
                    </div>
                )
            },
            nextArrow : <NextArrow/>,
            prevArrow : <PrevArrow/>
        }
                  
        return ( 
            <div style={styles.root}>
                <Slider {...settings} style={styles.slider}>
                    {this.renderItems()}
                </Slider>
            </div>
         );
    }
}

const styles = {
    root : {
        // backgroundColor: 'pink',
        height: '100vh',
        width: '100%'
    },

    slider : {
        height : '100%',
        width: '100%',
        backgroundColor: 'white',
        position: 'relative'
    },

    next: {
        position: 'absolute',
        right: '7%',
        top: '45%',
        zIndex : 3,
        backgroundColor : 'rgba(255, 255, 255, 0.4)'
    },

    previous: {
        position: 'absolute',
        left: '7%',
        top: '45%',
        zIndex : 3,
        backgroundColor : 'rgba(255, 255, 255, 0.4)'
    },

    dots : {
        // backgroundColor : 'green',
        position: 'absolute',
        bottom : 0,
        zIndex : 2,
        height: 30
    },

    content : {
        backgroundColor : 'red', 
        backgroundRepeat :  'no-repeat',
        backgroundSize: 'hover',
        height : '100vh',
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '5% auto'
    },

    title : {
        fontSize : 64,
        color: 'white',
        textTransform: 'capitalize',
        marginButton : 20

    },

    button : {
        backgroundColor : 'white',
        padding : '10px 20px'
    }
}

function NextArrow (props) {
    const { onClick } = props
    return (
    <IconButton style={styles.next} onClick={onClick}>
        <NavigateNextIcon/>
    </IconButton>
    )
}

function PrevArrow (props) {
    const { onClick } = props
    return (
        <IconButton style={styles.previous} onClick={onClick}>
            <NavigateBeforeIcon/>
        </IconButton>
    )
}

//fungsi yg mereturn suatu object, butuh input berupa state (state mewakili reducer berbentuk object)
const mapStateToProps = (state) => { //mapstatetoprops untuk ambil data
    return {
        data : state.carousel
    }

}
 
export default connect(mapStateToProps, { getDataCarousel })(Carousel);
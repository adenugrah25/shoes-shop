import React from 'react';
import CarouselComp from '../components/carousel'
import Axios from 'axios';
import Products from '../components/products'

const URL = "http://localhost:2000"
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      slideImage: []
     }
  }

  componentDidMount() {
    this.getSlider()
  }

  getSlider = () => {
    Axios.get(URL+"/slider")
    .then(response => {
      console.log(response.data)
      this.setState({ slideImage: response.data })
    })
    .catch(error => {
      console.log("error", error)
    })
    
  }
  render() { 
    return ( 
      <div> 
      <CarouselComp dataSlider={this.state.slideImage} />
      <Products />
      </div>
     );
  }
}
 
export default Home;

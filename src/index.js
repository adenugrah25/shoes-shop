import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import App from './App';
import { BrowserRouter } from 'react-router-dom'


//setupredux
import {createStore} from 'redux'
import {Provider} from 'react-redux' //Provider sebagai penghubung redux action dgn reducer, menghubungkan pake connect
import Reducers from './reducers'

//setelah diimport, harus dibuatkan variable sebagai penyimpan
let globalStore = createStore(Reducers) //penyimpanan global
globalStore.subscribe(() => console.log('global storage : ',  globalStore.getState()))


ReactDOM.render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);

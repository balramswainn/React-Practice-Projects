import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)


//React app ko Redux store ka access dena hota hai.Iske liye tum Provider use karte ho:Ab pura React app ke andar jo bhi component hai usko Redux store ke state ka access mil jata hai.
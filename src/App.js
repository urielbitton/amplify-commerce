import React from 'react'
import "./styles.css"
import { BrowserRouter as Router } from "react-router-dom"
import StoreContextProvider from "./comps/common/StoreContext"
import AppContainer from './comps/site/containers/AppContainer'


export default function App() { 
  return (
    <div className="App">
      <StoreContextProvider>
        <Router>
          <AppContainer />
        </Router>
      </StoreContextProvider>
    </div>
  );
}

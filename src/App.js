import React from 'react'
import "./styles.css"
import AppContainer from './comps/site/containers/AppContainer'
import { BrowserRouter as Router } from "react-router-dom"
import StoreContextProvider from "./comps/common/StoreContext"


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

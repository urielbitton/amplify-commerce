import React, { useContext } from 'react'
import AdminBtn from './AdminBtn'
import './styles/Navbar.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'

export default function Navbar() {

  const {myUser, darkMode, setDarkMode} = useContext(StoreContext)

  return (
    <div className="adminnav">
      <div className="left">
        <AdminBtn 
          title="Amplify Site"
          url="/"
          icon="fal fa-external-link"
          className="sitelinkbtn"
        />
      <AppInput 
        placeholder="Search..." 
        iconclass="fal fa-search"
      />
      </div>
      <div className="right">
        <div className="toolbar">
          <div className="iconcont">
            <i className="far fa-bell"></i>
          </div>
          <div className="iconcont" onClick={() => setDarkMode(prev => !prev)}>
            <i className={`fa${darkMode?"s":"r"} fa-eclipse`}></i>
          </div>
        </div>
        <div className="profcont">
          <img src={myUser?.profimg} alt=""/>
          <h6>{myUser?.fullname}</h6>
          <i className="far fa-angle-up"></i>
        </div>
      </div>
    </div> 
  )
}
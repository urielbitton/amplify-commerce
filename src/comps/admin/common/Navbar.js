import React, { useContext, useState, useEffect } from 'react'
import AdminBtn from './AdminBtn'
import './styles/Navbar.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'

export default function Navbar() {

  const {myUser, darkMode, setDarkMode} = useContext(StoreContext)
  const [openProf, setOpenProf] = useState(false)
  const history = useHistory()

  useEffect(() => {
    window.onclick = () => {
      openProf&&setOpenProf(false)
    } 
  },[openProf]) 

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
        <div className="profcont" onClick={() => setOpenProf(prev => !prev)}>
          <img src={myUser?.profimg} alt=""/>
          <h6>{myUser?.fullname}</h6>
          <i className={`far fa-angle-up ${openProf?"down":""}`}></i>
        </div>
        <div className={`profslidecont ${openProf?"open":""}`}>
          <h6>Account</h6>
          <Link to="/admin/settings/?query=5"><i className="far fa-user"></i>My Account</Link>
          <Link to="/admin/settings/general/?query=5"><i className="far fa-sliders-h"></i>Preferences</Link>
          <Link to="/admin/settings/support/?query=5"><i className="far fa-question-circle"></i>Support</Link>
          <h6>Actions</h6>
          <small onClick={() => firebase.auth().signOut().then(() => history.push('/'))}>
            <i className="far fa-sign-out"></i>
            Log Out
            </small>
        </div>
      </div>
    </div> 
  )
}
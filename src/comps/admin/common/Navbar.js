import React, { useContext, useState, useEffect } from 'react'
import AdminBtn from './AdminBtn'
import './styles/Navbar.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import ChatCard from '../Support/ChatCard'

export default function Navbar() {

  const {myUser, darkMode, setDarkMode, setNotifs, allChats} = useContext(StoreContext)
  const [openProf, setOpenProf] = useState(false)
  const [openUpdates, setOpenUpdates] = useState(false)
  const [openMsgs, setOpenMsgs] = useState(false)
  const [chatData, setChatData] = useState([])
  const history = useHistory()

  const chatsRow = allChats?.map(({chatInfo}) => {
    return <ChatCard chatInfo={chatInfo} urlCustId={0} setChatData={setChatData}/>
  })

  function toggleDarkMode() {
    setNotifs(prev => [...prev, {
      id: Date.now(),
      title: 'Theme',
      icon: 'fal fa-paint-brush',
      text: `Dark mode feature has been turned ${darkMode?"off":"on"}`,
      time: 5000
    }])
  }

  function logOutAdmin() {
    firebase.auth().signOut()
    .then(() => {
      history.push('/')
      window.location.reload()
    })
  }

  useEffect(() => {
    window.onclick = () => {
      openProf&&setOpenProf(false)
    } 
  },[openProf])

  useEffect(() => {
    window.onclick = () => {
      openUpdates&&setOpenUpdates(false)
    } 
  },[openUpdates])
  useEffect(() => {
    window.onclick = () => {
      openMsgs&&setOpenMsgs(false)
    } 
  },[openMsgs]) 

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
          <div className="iconcont" onClick={() => setOpenMsgs(prev => !prev)}>
            <i className="far fa-comment"></i>
          </div>
          <div className={`updatescont ${openMsgs?"open":""}`}>
            {chatsRow}
          </div>
          <div className="iconcont" onClick={() => setOpenUpdates(prev => !prev)}>
            <i className="far fa-bell"></i>
          </div>
          <div className={`updatescont ${openUpdates?"open":""}`}>
            <h4>Updates</h4>
          </div>
          <div className="iconcont" onClick={() => {setDarkMode(prev => !prev);toggleDarkMode()}}>
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
          <Link to="/admin/settings"><i className="far fa-user"></i>My Account</Link>
          <Link to="/admin/settings/general"><i className="far fa-sliders-h"></i>Preferences</Link>
          <Link to="/admin/settings/support"><i className="far fa-question-circle"></i>Support</Link>
          <h6>Actions</h6>
          <small onClick={() => logOutAdmin()}>
            <i className="far fa-sign-out"></i>
            Log Out
            </small>
        </div>
      </div>
    </div> 
  )
}
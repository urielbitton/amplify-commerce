import React, { useContext, useState, useEffect } from 'react'
import AdminBtn from './AdminBtn'
import './styles/Navbar.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import ChatCard from '../Support/ChatCard'
import { menuLinks, extraLinks } from './arrays/links'

export default function Navbar() {

  const {myUser, darkMode, setDarkMode, setNotifs, allChats, setFetchChats} = useContext(StoreContext)
  const [openDrop, setOpenDrop] = useState(0)
  const [chatData, setChatData] = useState([])
  const [showPageSearch, setShowPageSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const history = useHistory()
  const searchMenuLinks = [
    {name: 'Home',sublinks:[{name:'Dashboard',icon:'far fa-tachometer-alt-fast',url: '/admin/'}]},
    ...menuLinks.slice(1), ...extraLinks
  ]

  const chatsRow = allChats?.map(({chatInfo}) => {
    return <ChatCard chatInfo={chatInfo} urlCustId={0} setChatData={setChatData}/>
  })

  const pageRows = searchMenuLinks?.map(({name,sublinks}) => {
    return <>
      { sublinks?.filter(x => pattern.test(x.name) | pattern.test(name)).length>0&&
        <small>{name}</small>
      }
      {
        sublinks?.filter(x => pattern.test(x.name) || pattern.test(name)).map(el => {
          return <Link to={el.url}>
            <h6><i className={el.icon}></i>{el.name}</h6>
            <i className="fal fa-arrow-right"></i>
          </Link>
        })
      }
    </>
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
  function slideChats(e) {
    e.stopPropagation()
    setOpenDrop(3)
    setFetchChats(true)
  }

  useEffect(() => {
    window.onclick = () => setOpenDrop(0)
  },[openDrop])


  return (
    <div className="adminnav">
      <div className="left">
        <AdminBtn 
          title="Amplify Site"
          url="/"
          icon="fal fa-external-link"
          className="sitelinkbtn"
        />
      <div>
        <AppInput 
          placeholder="Search pages..." 
          iconclass="fal fa-search"
          onFocus={() => setShowPageSearch(true)}
          onBlur={() => setShowPageSearch(false)}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className={`pagesearchcont ${showPageSearch?"show":""}`}> 
          {pageRows}
        </div>
      </div>
      </div>
      <div className="right">
        <div className="toolbar">
          <div className={`iconcont ${openDrop===3?"open":""}`} onClick={(e) => slideChats(e)}>
            <i className="far fa-comment"></i>
            <div className={`updatescont ${openDrop===3?"open":""}`}>
              {chatsRow}
              <div className="viewallcont" onClick={() => history.push('/admin/support/customer-support')}>
                <h6>View All</h6>
              </div>
            </div>
          </div>
          <div className="iconcont" onClick={(e) => {setOpenDrop(2);e.stopPropagation()}}>
            <i className="far fa-bell"></i>
            <div className={`updatescont ${openDrop===2?"open":""}`}>
              <h4>Updates</h4>
            </div>
          </div>
          <div className="iconcont" onClick={() => {setDarkMode(prev => !prev);toggleDarkMode()}}>
            <i className={`fa${darkMode?"s":"r"} fa-eclipse`}></i>
          </div>
        </div>
        <div className="profcont" onClick={(e) => {setOpenDrop(1);e.stopPropagation()}}>
          <img src={myUser?.profimg} alt=""/>
          <h6>{myUser?.fullname}</h6>
          <i className={`far fa-angle-up ${openDrop===1?"down":""}`}></i>
        </div>
        <div className={`profslidecont ${openDrop===1?"open":""}`}>
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
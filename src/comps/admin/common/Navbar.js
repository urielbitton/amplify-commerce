import React, { useContext, useState, useEffect } from 'react'
import AdminBtn from './AdminBtn'
import './styles/Navbar.css'
import {AppInput} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import ChatCard from '../Support/ChatCard'
import { menuLinks, extraLinks } from './arrays/links'
import StartAChat from '../Support/StartAChat'
import UpdatesCard from './UpdatesCard'

export default function Navbar() {

  const {user, myUser, setMyUser, darkMode, setDarkMode, setNotifs, allChats, setFetchChats, 
    allUpdates} = useContext(StoreContext)
  const [openDrop, setOpenDrop] = useState(0)
  const [chatData, setChatData] = useState([])
  const [showPageSearch, setShowPageSearch] = useState(false)
  const [showNewChat, setShowNewChat] = useState(false)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const unreadChatsNum = allChats.filter(x => !x.chatInfo.read && x.chatInfo.lastSenderId !== 'admin').length
  const unreadNotifsNum = allUpdates.filter(x => !x.read).length
  const history = useHistory()

  const searchMenuLinks = [
    {name: 'Home',sublinks:[{name:'Dashboard',icon:'far fa-tachometer-alt-fast',url: '/admin/'}]},
    ...menuLinks.slice(1), ...extraLinks
  ]

  const chatsRow = allChats?.slice(0,4).map(({chatInfo}) => {
    return <ChatCard chatInfo={chatInfo} urlCustId={0} setChatData={setChatData} key={chatInfo.customerId}/>
  })
  const updatesRow = allUpdates?.slice(0,10).map(el => {
    return <UpdatesCard el={el} key={el.id} />
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

  function logOutAdmin(e) {
    e.stopPropagation()
    if(user) {
      firebase.auth().signOut().then(() => {
        history.push('/')
        setMyUser({}) 
      }).catch(err => console.log(err))
    }
  }
  function slideChats(e) {
    e.stopPropagation()
    openDrop!==3?setOpenDrop(3):setOpenDrop(0)
  }
  function slideNotifs(e) {
    e.stopPropagation()
    openDrop!==2?setOpenDrop(2):setOpenDrop(0)
  }
  function slideProfile(e) {
    e.stopPropagation()
    openDrop!==1?setOpenDrop(1):setOpenDrop(0)
  }

  useEffect(() => {
    window.onclick = () => setOpenDrop(0)
  },[openDrop])

  useEffect(() => {
    setFetchChats(true)
  },[])

  return (
    <div className="adminnav">
      <div className="left">
        <AdminBtn 
          title="Amplify Site"
          url="/"
          icon="fal fa-external-link"
          className="sitelinkbtn dark-bg-1"
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
            <i className={`far fa-comment ${unreadChatsNum>0?"colored":""}`}></i>
            <div className={`updatescont ${openDrop===3?"open":""}`}>
              <h4>Chats<i className="fal fa-plus" onClick={() => setShowNewChat(true)}></i></h4>
              <div className="inner">
                {chatsRow}
              </div>
              <div className="viewallcont" onClick={() => history.push('/admin/support/customer-support')}>
                <h6>View All</h6>
              </div>
            </div>
            <div className={`circlenum ${unreadChatsNum?"show":""}`}>
              <small>{unreadChatsNum}</small>
            </div>
          </div>
          <div className={`iconcont ${openDrop===2?"open":""}`} onClick={(e) => slideNotifs(e)}>
            <i className={`far fa-bell ${unreadNotifsNum>0?"colored":""}`}></i>
            <div className={`updatescont ${openDrop===2?"open":""}`}>
              <h4>Updates</h4>
              <div className="inner">
                {updatesRow}
              </div>
              <div className="viewallcont" onClick={() => history.push('/admin/updates')}>
                <h6>View All</h6>
              </div>
            </div>
            <div className={`circlenum ${unreadNotifsNum?"show":""}`}>
              <small>{unreadNotifsNum}</small>
            </div>
          </div>
          <div className="iconcont" onClick={() => {setDarkMode(prev => !prev);toggleDarkMode()}}>
            <i className={`fa${darkMode?"s":"r"} fa-eclipse`}></i>
          </div>
        </div>
        <div className="profcont" onClick={(e) => slideProfile(e)}>
          <img src={myUser?.profimg.length?myUser.profimg:"https://i.imgur.com/1OKoctC.jpg"} alt=""/>
          <h6>{myUser?.fullname}</h6>
          <i className={`far fa-angle-up ${openDrop===1?"down":""}`}></i>
        </div>
        <div className={`profslidecont ${openDrop===1?"open":""}`}>
          <h6>Account</h6>
          <Link to="/admin/settings/account"><i className="far fa-user"></i>My Account</Link>
          <Link to="/admin/settings/general"><i className="far fa-sliders-h"></i>Preferences</Link>
          <Link to="/admin/support/admin-support"><i className="far fa-question-circle"></i>Support</Link>
          <h6>Actions</h6>
          <small onClick={(e) => logOutAdmin(e)}>
            <i className="far fa-sign-out"></i>
            Log Out
            </small>
        </div>
      </div>
      <StartAChat 
        showNewChat={showNewChat}
        setShowNewChat={setShowNewChat}
        tempCustomerId=""
      />
    </div> 
  )
}
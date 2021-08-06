import React, { useContext, useEffect, useState } from 'react'
import './styles/Reauth.css'
import Logo from './Logo'
import { AppInput } from './AppInputs'
import { StoreContext } from './StoreContext'
import AdminBtn from '../admin/common/AdminBtn'
import firebase from 'firebase'

export default function Reauth(props) {

  const {myUser, user, setNotifs} = useContext(StoreContext)
  const {showReauth=false, setShowReauth, setAllowUpdate} = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const credentials = firebase.auth.EmailAuthProvider.credential(email, password)

  function reLogin() {
    user.reauthenticateWithCredential(credentials)
    .then(() => {
      setShowReauth(false)
      setAllowUpdate(true)
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Authentication Successful',
        icon: 'fal fa-user-shield',
        text: `You have been successfully reauthenticated.`,
        time: 5000
      }])
    }).catch((err) => {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Authentication Failed',
        color: 'var(--red)',
        icon: 'fal fa-user-shield',
        text: `There was an error authenticating you. Please try again later.`,
        time: 7000
      }])
      console.log(err)
    })
  }

  useEffect(() => {
    setEmail(myUser.email)
    setPassword(myUser.password)
  },[myUser])

  return (
    <div className={`reauthcover ${showReauth?"show":""}`}>
      <div className="reauthcont">
        <Logo color/>
        <h4>Login to authenticate yourself</h4>
        <AppInput title="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <AppInput title="Password" type="password" onChange={(e) => setEmail(e.target.value)} value={password} />
        <div className="btnsrow">
          <AdminBtn title="Login" solid clickEvent onClick={() => reLogin()}/>
          <AdminBtn title="Cancel" clickEvent onClick={() => setShowReauth(false)}/>
        </div>
      </div>
    </div>
  )
}
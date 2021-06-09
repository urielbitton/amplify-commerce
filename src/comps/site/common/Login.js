import React, { useContext, useEffect, useState } from 'react'
import './styles/Login.css'  
import {AppInput} from '../../common/AppInputs'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import {db} from '../../common/Fire'
import PageBanner from './PageBanner'
import {StoreContext} from '../../common/StoreContext'

export default function Login(props) {

  const {setAUser} = useContext(StoreContext)
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [emailError, setEmailError] = useState('') 
  const [passError, setPassError] = useState('')
  const history = useHistory()

  function handleLogin() { 
    clearErrors()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      authListener()
    })
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
            return setEmailError('Make sure to enter a valid email.')
        case "auth/user/disabled":
            return setEmailError('This user is disabled.')
        case "auth/user-not-found":
            return setEmailError('This user does not exist.')
        case "auth/wrong-password":
          setPassError('Password is incorrect')
        break
        default:
      }  
    }) 
  } 
  function authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        setAUser(user)
        clearInputs()
      }
      else {
        setAUser(null)
      }
    })
  } 
  const clearErrors = () => {
    setEmailError('')
    setPassError('')
  }
  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }
  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('email')
    firebase.auth().signInWithPopup(provider)
    .then((res) => {
      if(res.additionalUserInfo.isNewUser) {
        const userinfo = {
          userid: res.additionalUserInfo.profile.id,
          fullname: res.additionalUserInfo.profile.name,
          usertype: 'client', 
          email: res.additionalUserInfo.profile.email,
          phone: "",
          city: "",
          provstate: "",
          country: "",
          profimg: res.additionalUserInfo.profile.picture,
          cart: [],
          savedlater: [],
          wishlist: [],
          orders: [],
          settings: {
            
          } 
        }
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
            db.collection('users').doc(user.uid).set({
              userinfo
            }).then(res => { 
              db.collection('orders').doc(user.uid).set({
                allorders: []
              })
              console.log(user)
              history.push('/')
            }).catch(err => window.alert('An errror occurred with the google login. Please try again.'))
          }
        })
      }
      else {
        setAUser(res.user)
        history.push('/')
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => { 
    clearInputs()
    authListener() 
  },[]) 
 
  return (
    <div className="loginpage">
      <PageBanner 
        title="Log In"
      />
      <div className="grid xgrid">
        <div className="loginform">
          <div className="infocont">
            <h2>Welcome back</h2>
            <div className="loginbtnscont">
            <div className="googlebtn" onClick={() => loginWithGoogle()}>
              <img src="https://i.imgur.com/AiBQ9eZ.png" alt="" />
              <h6>Log in With Google</h6><i></i>
            </div>
            </div>
            <AppInput iconclass="far fa-envelope" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <p className="logerrors">{emailError}</p>
            <AppInput iconclass="far fa-lock" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <p className="logerrors">{passError}</p>
            <div className="loginformactions">
              <AppInput type="checkbox" title="Remember me"/>
              <Link to="/forgotpass">Forgot Password</Link>
            </div>
            <div className="loginbtn" onClick={() => handleLogin()}>
              <span></span>
              <h6>Log in</h6>
              <i className="fal fa-long-arrow-right"></i>
            </div>
            <div className="bottomdiv">
              <Link to="/" className="backtosite"><i className="fal fa-long-arrow-left"></i>Back to site</Link>
              <small>Don't have an account? <Link to="/register">Register here</Link></small>
            </div>
          </div>
          <div className="imgcont" style={{backgroundImage: 'url(https://i.imgur.com/WbadmIu.jpg)'}}>
            
          </div>
        </div>
      </div>
    </div>
  )
} 
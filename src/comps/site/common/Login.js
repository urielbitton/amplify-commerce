import React, { useContext, useEffect, useState } from 'react'
import './styles/Login.css'  
import {AppInput} from '../../common/AppInputs'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import {db} from '../../common/Fire'
import PageBanner from './PageBanner'
import {StoreContext} from '../../common/StoreContext'
import genRandomNum from '../../common/genRandomNum'

export default function Login(props) {

  const {setAUser, myUser, user} = useContext(StoreContext)
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [emailError, setEmailError] = useState('') 
  const [passError, setPassError] = useState('')
  const [isLogging, setIsLogging] = useState(false)
  const history = useHistory()

  function handleLogin() { 
    setIsLogging(true)
    clearErrors()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      authListener()
    })
    .catch(err => {
      setIsLogging(false)
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
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
            db.collection('users').doc(user.uid).set({
              userinfo: {
                userid: user.uid,
                fullname: res.additionalUserInfo.profile.name,
                email: res.additionalUserInfo.profile.email,
                phone: "",
                city: "",
                provstate: "",
                country: "",
                profimg: res.additionalUserInfo.profile.picture,
                isAdmin: false,
                cart: [],
                savedlater: [],
                wishlist: [],
                addresses: [],
                payments: [],
                settings: {},
                dateCreated: new Date(),
                isActive:true
              }
            }).then(() => { 
              db.collection('customers').doc(user.uid).set({
                id:user.uid,name: res.additionalUserInfo.profile.name??'',email:'',phone:'',city:'', provstate:'',
                provstateCode:'',country:'',countryCode:'',moneySpent: 0, number: genRandomNum(), 
                profimg: res.additionalUserInfo.profile.picture, userRating: 0, dateCreated: new Date(), isActive:true
              }) 
              history.push('/my-account')
            })
          }
        })
      }
      else {
        setAUser(res.user)
        history.push('/my-account')
      }
    }).catch(err => window.alert('An errror occurred with the google login. Please try again.'))
  }

  useEffect(() => { 
    clearInputs()
    authListener() 
    return () => setIsLogging(false)
  },[]) 

  useEffect(() => {
    if(myUser?.isAdmin) {
      history.push('/admin')
    }
    if(user && !myUser?.isAdmin) {
      history.push('/my-account')
    }
  },[myUser])
 
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
              {
                !user&&isLogging?
                <div class="spinner-5"></div>:
                <i className="fal fa-long-arrow-right"></i>
              }
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
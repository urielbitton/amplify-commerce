import React, { useEffect, useState } from 'react'
import './styles/Login.css'  
import {AppInput} from '../../common/AppInputs'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import {db} from '../../common/Fire'

export default function Login(props) {

  const user = firebase.auth().currentUser
  const [auser, setAUser] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [emailError, setEmailError] = useState('') 
  const [passError, setPassError] = useState('')
  const [authFlag, setAuthFlag] = useState(false)
  const history = useHistory()

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs()
        setAUser(user)
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
  const handleSignup = () => {
    setAuthFlag(true)
    clearErrors()
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
      switch(err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message)
        break
        case "auth/weak-password":
          setPassError(err.message)
        break
        default: 
      }
    })
    firebase.auth().onAuthStateChanged(user => {
      if(authFlag) {
        if(user) {
          user.updateProfile({
            displayName: name,
            photoURL: 'https://i.imgur.com/1OKoctC.jpg'
          })
          const userinfo = {
            userid: db.collection('users').doc().id,
            fullname: name,
            usertype: 'client', 
            email: email,
            phone: "", 
            city: "",
            provstate: "",
            country: "",
            profimg: "https://i.imgur.com/1OKoctC.jpg",
            cart: [],
            wishlist: [],
            settings: {
              
            } 
          }
          db.collection('users').doc(user.uid).set({
            userinfo
          })  
          setAUser(user)
          history.push('/my-account')
        }
        else {
          setAUser(null)
        } 
      }
    })
  }
  function loginWithGoogle() {
    setAuthFlag(false)
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
          wishlist: [],
          settings: {
            
          } 
        }
        db.collection('users').doc(res.additionalUserInfo.profile.id).set({
          userinfo
        }) 
      }
      setAUser(res.additionalUserInfo)
      history.push('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => { 
    clearInputs()
    clearErrors()
    authListener()
  },[])
 
  return (
    <div className="loginpage">
      <div className="grid xgrid">
        <div className="loginform">
          <div className="infocont">
            <h2>Create an Account</h2>
            <div className="loginbtnscont">
            <div className="googlebtn" onClick={() => loginWithGoogle()}>
              <img src="https://i.imgur.com/AiBQ9eZ.png" alt="" />
              <h6>Sign up With Google</h6><i></i>
            </div>
            </div>
            <AppInput iconclass="far fa-user" placeholder="Name" autoComplete="name" type="name" onChange={(e) => setName(e.target.value)} />
            <AppInput iconclass="far fa-envelope" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
            <p className="logerrors">{emailError}</p> 
            <AppInput iconclass="far fa-lock" placeholder="Password" type="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
            <p className="logerrors">{passError}</p>
            <div className="loginformactions">
              <AppInput type="checkbox" title="Remember me"/>
              <Link to="/forgotpass">Forgot Password</Link>
            </div>
            <div className="loginbtn" onClick={() => handleSignup()}>
              <span></span>
              <h6>Sign up</h6>
              <i className="fal fa-long-arrow-right"></i>
            </div>
            <div className="bottomdiv">
              <Link to="/" className="backtosite"><i className="fal fa-long-arrow-left"></i>Back to site</Link>
              <small>Already have an account? <Link to="/login">Login here</Link></small>
            </div>
          </div>
          <div className="imgcont" style={{backgroundImage: 'url(https://i.imgur.com/Xz7GxXp.jpg)'}}>
            
          </div>
        </div>
      </div>
    </div>
  )
} 
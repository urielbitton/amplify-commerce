import React, { useContext, useEffect, useState } from 'react'
import './styles/Login.css'  
import {AppInput} from '../../common/AppInputs'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import {db} from '../../common/Fire'
import PageBanner from './PageBanner'
import { StoreContext } from '../../common/StoreContext'
import genRandomNum from '../../common/genRandomNum'

export default function Login(props) {

  const {setAUser, myUser} = useContext(StoreContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [emailError, setEmailError] = useState('') 
  const [passError, setPassError] = useState('')
  const [isLogging, setIsLogging] = useState(false)
  const history = useHistory()
  const defaultImg = 'https://i.imgur.com/1OKoctC.jpg'

  function authListener() {
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
  function clearErrors() {
    setEmailError('')
    setPassError('')
  }
  function clearInputs() {
    setEmail('')
    setPassword('')
  }

  function handleSignup() {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
      switch(err.code) {
        case "auth/email-already-in-use":
          setEmailError('Please enter a valid email address.'); break;
        case "auth/invalid-email":
          setEmailError('Please enter a valid email address.'); break;
        case "auth/weak-password":
          setPassError('The password is not long enough or too easy to guess.')
        break
        default: 
      }
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        user.updateProfile({
          displayName: name,
          photoURL: defaultImg
        })
        const userinfo = {
          userid: user.uid,
          fullname: name,
          email: email,
          password,
          phone: "", 
          city: "", 
          provstate: "",
          country: "",
          profimg: defaultImg,
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
        db.collection('users').doc(user.uid).set({
          userinfo 
        }).then(res => { 
          db.collection('customers').doc(user.uid).set({
            id:user.uid,name: name??'',email:email,phone:'',city:'',provstate:'',provstateCode:'',
            country:'',countryCode:'', moneySpent: 0, number: genRandomNum(), profimg: defaultImg,
            userRating: 0, dateCreated: new Date(), isActive:true
          }) 
          setAUser(user)
          history.push('/my-account')
        })
      }
      else {
        setAUser(null)
      } 
    })
    clearErrors()
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
            }).then(res => {
              db.collection('customers').doc(user.uid).set({
                id:user.uid,name: name??'',email:email,phone:'',city:'', provstate:'',provstateCode:'',
                country:'',countryCode:'',moneySpent: 0, number: genRandomNum(), profimg: defaultImg,
                userRating: 0, dateCreated: new Date(), isActive:true
              }) 
              setAUser(user)
              console.log(user)
              history.push('/my-account')
            })
          }
        }) 
      }
    }).catch((error) => {
      console.log(error)
    }) 
  }

  useEffect(() => { 
    clearErrors()
    authListener()
    return () => setIsLogging(false)
  },[]) 
 
  return (
    <div className="loginpage">
      <PageBanner 
        title="Register"
      />
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
              <h6>Create Account</h6>
              {
                !myUser?.isAdmin&&isLogging?
                <div class="spinner-5"></div>:
                <i className="fal fa-long-arrow-right"></i>
              }
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
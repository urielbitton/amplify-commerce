import React, { useContext, useEffect, useState } from 'react'
import './styles/Navbar.css'
import Logo from '../../common/Logo'
import { Link, NavLink } from 'react-router-dom'
import menuLinks from './arrays/menuLinks'
import {StoreContext} from '../../common/StoreContext'
import firebase from 'firebase'
import AppButton from '../common/AppButton'

export default function Navbar() {

  const {slideNav, setSlideNav, myUser} = useContext(StoreContext)
  const [dealBar, setDealBar] = useState(true)
  const [fixNav, setFixNav] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const user = firebase.auth().currentUser
  let prevScrollpos = window.pageYOffset
  
  const menulinksrow = menuLinks?.map(({name,url,exact,sublinks}) => {
    return <div className="menulink" key={name}>
      <NavLink exact={exact} to={url} activeClassName="activemenulink">{name}<hr/></NavLink>
      {
        sublinks?.map(({name,url}) => {
          return <div className="sublink" key={name}>
            <NavLink to={url}>{name}</NavLink>
          </div>
        }) 
      } 
    </div>
  })

  const cartitemrow = myUser?.cart?.map(el => {
    return <div className="cartitemcont">
      <img src={el?.item?.imgs[0]} alt=""/>
      <div className="infocont">
        <div>
          <h5>{el?.item?.name}</h5>
          <h6>{el?.units} x ${el?.item.price}</h6>
        </div>
        <i className="fal fa-times"></i>
      </div>
    </div>
  })

  useEffect(() => {
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset
      if(window.pageYOffset > 130) {
        if (prevScrollpos < currentScrollPos) {
          setFixNav(true)
        }  
      }
      else {
        setFixNav(false)
      }
      prevScrollpos = currentScrollPos
    }
  },[])
  useEffect(() => {
    window.onclick = () => {
      showCart&&setShowCart(false) 
    }
  },[showCart])

  return (
    <>
      { dealBar&&
        <div className="dealbar">
          <div></div>
          <p>Exclusive deals this weekend - <span>30% OFF</span> all women's wear.  
            <Link href="#">Get deal</Link>
          </p>
          <i className="fal fa-times" onClick={() => setDealBar(false)}></i>
        </div>
      }
      <nav className={`navbar ${fixNav&&"fixednav"}`}>
        <div className="grid">
          <div className="left">
            <Logo color text linkable />
            <div className="menu">
              {menulinksrow}
            </div>
          </div>
          <div className="right">
            <div>
              <i className="fal fa-search"></i>
            </div> 
            <div>
              <i className="fal fa-heart"></i>
              <div className="numcircle">2</div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <i className="fal fa-shopping-cart" onClick={() => setShowCart(prev => !prev)}></i>  
              {myUser?.cart?.length>0&&<div className="numcircle">{myUser.cart.length}</div>}
              <div className={`cartcont ${showCart&&"show"}`}>
                <div className="cartproducts">
                  {cartitemrow} 
                </div>
                <div className="totalsdiv">
                  <span>total:</span>
                  <small>${myUser?.cart?.reduce((a, b) => a + b.item.price, 0)}</small>
                </div>
                <div className="btnscont">
                  <AppButton title="View Cart" className="viewcart"/>
                  <AppButton title="Checkout" className="checkout"/> 
                </div>
              </div>
            </div>
            <div>
              <Link to={user?"/my-account":"/login"}><i className="fal fa-user"></i></Link>
            </div>
            { user&& 
              <div>
                <i className="fal fa-sign-out" onClick={() => firebase.auth().signOut()}></i>
              </div>
            }
            <div className={`mobbtn ${slideNav&&"active"}`} onClick={() => setSlideNav(prev => !prev)}>
              <hr/><hr/><hr/>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}


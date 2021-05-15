import React, { useContext, useEffect, useState } from 'react'
import './styles/Navbar.css'
import Logo from '../../common/Logo'
import { Link, NavLink } from 'react-router-dom'
import menuLinks from './arrays/menuLinks'
import {StoreContext} from '../../common/StoreContext'
import {db} from '../../common/Fire'
import AppButton from '../common/AppButton'

export default function Navbar() {

  const {user, slideNav, showCart, setShowCart, setSlideNav, myUser, cartSubtotal} = useContext(StoreContext)
  const [dealBar, setDealBar] = useState(true)
  const [fixNav, setFixNav] = useState(false)
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
    return <div className="cartitemcont" key={el?.item?.id}>
      <img 
        src={el?.item?.imgs[0]}  
        alt="" 
        title={`Color: ${el.chosenColor}. Size: ${el.chosenSize}`} 
      />
      <div className="infocont">
        <div>
          <Link to={`/product/${el?.item?.id}`}><h5>{el?.item?.name}</h5></Link>
          <h6>Price: ${el?.item.price.toFixed(2)}</h6>
          <h6>Units: {el?.units}</h6>
        </div>
        <i className="fal fa-times" onClick={() => removeCartItem(el?.item?.id)}></i>
      </div>
    </div>
  })
  function removeCartItem(itemid) {
    myUser.cart.forEach(el => {
      if(el.item.id===itemid) {
        let itemindex = myUser.cart.indexOf(el)
        myUser.cart.splice(itemindex,1)
      }
    })
    db.collection('users').doc(user.uid).update({
      userinfo: myUser
    })
  }
  function clearCart() {
    myUser.cart = []
    db.collection('users').doc(user.uid).update({
      userinfo: myUser
    })
  }

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
            <div title="Find products">
              <i className="fal fa-search"></i>
            </div> 
            <Link to="/wishlist">
              <div title="My Wishlist">
                <i className="fal fa-heart"></i>
                {myUser?.wishlist?.length>0&&<div className="numcircle">{myUser?.wishlist?.length}</div>}
              </div>
            </Link>
            <div onClick={(e) => e.stopPropagation()}>
              <i className="fal fa-shopping-cart" title="My Cart" onClick={() => setShowCart(prev => !prev)}></i>  
              {myUser?.cart?.length>0&&<div className="numcircle">{myUser?.cart?.length}</div>}
              <div className={`cartcont ${showCart&&"show"}`}>
                <div className="cartfull" style={{display: myUser?.cart?.length?"flex":"none"}}>
                  <div className="cartproducts">
                    {cartitemrow} 
                  </div>
                  <div className="totalsdiv">
                    <span>Total:</span>
                    <small>{cartSubtotal}</small>
                  </div>
                  { myUser?.cart?.length>2&&
                    <small className="clearcart" onClick={() => clearCart()}>Clear Cart</small>
                  }
                  <div className="btnscont">
                    <AppButton title="View Cart" className="viewcart" url="/cart" />
                    <AppButton title="Checkout" className="checkout" url="/checkout" /> 
                  </div>
                </div>
                <div className="cartempty" style={{display: !myUser?.cart?.length?"flex":"none"}}>
                  <i className="fal fa-shopping-cart"></i>
                  <h4>Your cart is empty</h4>
                  <AppButton title="Add Items" url="/shop"/>
                </div>
              </div>
            </div>
            <div>
              <Link to={user?"/my-account":"/login"}><i className="fal fa-user"></i></Link>
            </div>
            <div className={`mobbtn ${slideNav&&"active"}`} onClick={() => setSlideNav(prev => !prev)}>
              <hr/><hr/><hr/>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}


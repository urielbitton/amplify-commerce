import React, { useContext, useEffect, useState } from 'react'
import './styles/Navbar.css'
import Logo from '../../common/Logo'
import { Link, NavLink } from 'react-router-dom'
import menuLinks from './arrays/menuLinks'
import {StoreContext} from '../../common/StoreContext'
import {db} from '../../common/Fire'
import AppButton from '../common/AppButton'
import refProd from '../../common/referProduct'
import {colorConverter} from '../../common/UtilityFuncs'

export default function Navbar() {

  const {allProducts, user, slideNav, showCart, setShowCart, setSlideNav, myUser, cartSubtotal, 
    currencyFormat, setShowSearch} = useContext(StoreContext)
  const [dealBar, setDealBar] = useState(true)
  const [fixNav, setFixNav] = useState(false)
  const cart = myUser?.cart
  const savedlater = myUser?.savedlater
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

  const cartitemrow = cart?.map(({id,units,chosenColor,chosenSize,subid}) => {
    return <div className="cartitemcont" key={subid}>
      <img 
        src={refProd(allProducts,id).imgs[0]}  
        alt="" 
      />
      <div className="infocont">
        <div>
          <Link to={`/product/${id}`}><h5>{refProd(allProducts,id).name}</h5></Link>
          <h6>Size: {chosenSize?.toUpperCase()}, Color: {colorConverter(chosenColor)}</h6>
          <h6>Price: ${refProd(allProducts,id).price.toFixed(2)}</h6>
          <h6>Units: {units}</h6>
        </div>
        <i className="fal fa-times" onClick={() => removeCartItem(subid)}></i>
      </div>
    </div>
  })

  function removeCartItem(subid) {
    cart.forEach(el => {
      if(el.subid===subid) {
        let itemindex = cart.indexOf(el)
        cart.splice(itemindex,1)
      }
    })
    db.collection('users').doc(user.uid).update({
      userinfo: myUser
    })
  }
  function clearCart() {
    let confirm = window.confirm('Are you sure you want to remove all items from your cart?')
    if(confirm) {
      myUser.cart = []
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      })
    }
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
              <i className="fal fa-search" onClick={() => setShowSearch(true)}></i>
            </div> 
            <Link to="/wishlist">
              <div title="My Wishlist">
                <i className="fal fa-heart"></i>
                {myUser?.wishlist?.length>0&&<div className="numcircle">{myUser?.wishlist?.length}</div>}
              </div>
            </Link>
            <div onClick={(e) => e.stopPropagation()}>
              <i className="fal fa-shopping-bag" title="My Cart" onClick={() => setShowCart(prev => !prev)}></i>  
              {cart?.length>0&&<div className="numcircle">{cart?.length}</div>}
              <div className={`cartcont ${showCart&&"show"}`}>
                <div className="cartfull" style={{display: cart?.length?"flex":"none"}}>
                  <div className="cartproducts">
                    {cartitemrow} 
                  </div>
                  <div className="totalsdiv">
                    <span>Total:</span>
                    <small>{currencyFormat.format(cartSubtotal)}</small>
                  </div>
                  { cart?.length>2&&
                    <small className="clearcart" onClick={() => clearCart()}>Clear Cart</small>
                  }
                  <div className="btnscont">
                    <AppButton title="View Cart" className="viewcart" url="/cart" />
                    <AppButton title="Checkout" className="checkout" url="/checkout" /> 
                  </div>
                </div>
                {
                  !cart?.length&&
                  <div className="cartempty">
                    <i className="fal fa-shopping-cart"></i>
                    <h4>Your cart is empty</h4>
                    <div className="emptybtnscont">
                      <AppButton title="Add Items" url="/shop"/>
                      {savedlater?.length?<AppButton title="View Saved" url="/cart"/>:""}
                    </div>
                  </div>
                }
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


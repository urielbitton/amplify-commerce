import React, { useContext, useEffect, useRef, useState } from 'react'
import './styles/AccountProfile.css'
import AppButton from '../common/AppButton'
import {StoreContext} from '../../common/StoreContext'
import {AppInput} from '../../common/AppInputs'
import { db } from '../../common/Fire'
import CustImgUploader from '../../common/CustImgUploader'

export default function AccountProfile()  {

  const {myUser, user, myOrders, numberFormat, currencyFormat} = useContext(StoreContext)
  const purchases = myOrders?.reduce((a,b) => a+b.products.length,0)
  const reviews = myUser?.reviews
  const moneyspent = myOrders?.reduce((a,b) => a+b.orderTotal,0)
  const [fname, setFname] = useState(myUser?.fullname?.split(' ')[0])
  const [lname, setLname] = useState(myUser?.fullname?.split(' ')[1])
  const [email, setEmail] = useState(myUser?.email)
  const [password, setPassword] = useState()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef()

  function updateInfo() {
    db.collection('users').doc(user.uid).update({
      'userinfo.fullname': `${fname} ${lname}`
    }).then(res => {
      window.alert('Your account info has been successfully updated.')
    })
  }

  useEffect(() => {
    setUrl(myUser?.profimg)
  },[myUser])
 
  return (
    <div className="accountprofilepage">
      <h3 className="accounttitle">Profile</h3>
      <div className="profilecont">
        <div>
          <div className="profimgcont">
            <label>
              <input 
                style={{display:'none'}} 
                type="file" 
                onChange={(e) => CustImgUploader(e, user.uid, setLoading, loadingRef, setUrl, true)}
              />
              <img src={url.length?url:'https://i.imgur.com/1OKoctC.jpg'} alt=""/>
              <div className="iconcont">
                <i className="fas fa-camera"></i>
              </div>
              <div className={`loadertube ${loading?"show":""}`}>
                <div className="prog" ref={loadingRef}></div>
              </div>
            </label>
          </div>
          <div>
            <h4>{myUser?.fullname}</h4>
            <h5>{myUser?.email}</h5>
          </div>
        </div>
        <div className="profilegrid">
          <ProfileCard title="Overview" className="overviewcont">
            <div>
              <h2>{numberFormat.format(myOrders.length)}</h2>
              <h6>Orders</h6>
            </div>
            <div>
              <h2>{numberFormat.format(purchases)}</h2>
              <h6>Products<br/>Purchased</h6>
            </div>
            <div>
              <h2>{numberFormat.format(reviews)}</h2>
              <h6>Reviews</h6>
            </div>
            <div>
              <h2>{currencyFormat.format(parseInt(moneyspent,10))}</h2>
              <h6>Money<br/>Spent</h6>
            </div>
          </ProfileCard>
          <ProfileCard title="About Me">
            <h6>Add a short paragraph about yourself.</h6>
          </ProfileCard>
          <form>
            <AppInput 
              title="First Name" 
              className="halfwidth" 
              onChange={(e) => setFname(e.target.value)} 
              value={fname}
            />
            <AppInput 
              title="Last Name" 
              className="halfwidth" 
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
            <AppInput 
              title="Email" 
              value={email}
              disabled
            />
            <AppInput title="Password" value={password} disabled/>
            <AppInput title="Confirm Password" value={password} disabled/>
          </form>
        </div>
        <div className="btnscont">
          <AppButton 
            title="Save"
            className="adminbtn"
            onClick={() => updateInfo()}
          />
        </div>
      </div>
    </div>
  )
}

export function ProfileCard(props) {

  const {title, children, className} = props

  return (
    <div className={`profilecard ${className}`}>
      <h4>{title}</h4>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
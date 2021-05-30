import React, { useContext, useState } from 'react'
import './styles/AccountProfile.css'
import AppButton from '../common/AppButton'
import {StoreContext} from '../../common/StoreContext'
import {AppInput} from '../../common/AppInputs'

export default function AccountProfile()  {

  const {myUser, myOrders, numberFormat, currencyFormat} = useContext(StoreContext)
  const purchases = myOrders?.reduce((a,b) => a+b.products.length,0)
  const reviews = myUser?.reviews
  const moneyspent = myOrders?.reduce((a,b) => a+b.orderTotal,0)
  const [fname, setFname] = useState(myUser?.fullname?.split(' ')[0])
  const [lname, setLname] = useState(myUser?.fullname?.split(' ')[1])
  const [email, setEmail] = useState(myUser?.email)
  const [password, setPassword] = useState()

  function updateInfo() {

  }
 
  return (
    <div className="accountprofilepage">
      <h3 className="accounttitle">Profile</h3>
      <div className="profilecont">
        <div>
          <div className="profimgcont">
            <img src="https://i.imgur.com/8VnozI9.jpg" alt=""/>
            <div className="iconcont">
              <i className="fas fa-camera"></i>
            </div>
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
              value={lname}
            />
            <AppInput 
              title="Email" 
              value={email}
            />
            <AppInput title="Password" value={password}/>
            <AppInput title="Confirm Password" value={password}/>
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
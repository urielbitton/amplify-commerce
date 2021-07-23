import React, { useContext } from 'react'
import './styles/CustomerPage.css'
import {getUserById} from '../../common/UtilityFuncs'
import {StoreContext} from '../../common/StoreContext'

export default function CustomerPage(props) {

  const {allUsers, currencyFormat} = useContext(StoreContext)
  const {name, profimg, email, phone, address, postCode, city, provState, country,
    number, id, moneySpent} = props.el

  return (
    <div className="onecustomerpage">
      <div className="pagecont">
        <div className="left">
          <img src={profimg} alt=""/>
          <div className="section">
            <h6>Customer Info</h6>
            <h5><i className="fal fa-user"></i><b>{name}</b></h5>
            <h5><i className="fal fa-envelope"></i>{email}</h5>
            <h5><i className="fal fa-phone"></i>{phone}</h5>
            <h5>
              <i className="fal fa-map-marker-alt"></i>
              {address} 
              <span className="upper">{postCode}</span></h5>
            <h5>
              <i className="fal fa-globe-americas"></i>
              {city} ({provState}), {country}
            </h5>
          </div>
          <div className="section data">
            <h6>Customer Data</h6>
            <h5><b>Customer Number:</b> #{number}</h5>
            <h5><b>Customer ID:</b> {id}</h5>
            <h5><b>User Type:</b>{getUserById(allUsers, id)?.isAdmin?"Admin":"Client"}</h5>
            <h5><b>Money Spent:</b> {currencyFormat.format(moneySpent)}</h5>
          </div>
        </div>
        <div className="right">

        </div>
      </div>
    </div>
  )
}
import React, {useContext} from 'react'
import AppButton from '../common/AppButton'
import AppAccordion from '../common/AppAccordion'
import {StoreContext} from '../../common/StoreContext'

export default function AccountWallet() {
  
  const {myUser} = useContext(StoreContext)
  const payments = myUser?.payments

  const paymentsrow = payments?.map((el) => {
    return <AppAccordion 
      title={
        <><img src="https://i.imgur.com/qFu3UQf.jpg" alt=""/>{el.cardname} ****{el.cardnumber.slice(-4)}</>
      }>
      <div className="space-between">
        <div className="left">
          <div>
            <h6>Cardholder Name</h6>
            <span>{el.cardholder}</span>
          </div>
          <div>
            <h6>Expiry Date</h6>
            <span>{`${el.expiryMonth<10?"0"+el.expiryMonth:el.expiryMonth}`}/{el.expiryYear}</span>
          </div>
          <div>
            <h6>Bank</h6>
            <span>{el.bank}</span>
          </div>
        </div>
        <div className="right">
          <div>
            <h6>Billing Address</h6>
            <small>{el.billingAddress.fname} {el.billingAddress.lname}</small>
            <small>{el.billingAddress.address}</small>
            <small style={{display: el.billingAddress.aptunit.length?"block":"none"}}>
              Apt. {el.billingAddress.aptunit}
            </small>
            <small>{el.billingAddress.city}, {el.billingAddress.provstate} {el.billingAddress.postcode}</small>
            <small>{el.billingAddress.country}</small>
            <small>{el.billingAddress.phone}</small>
          </div>
        </div>
      </div>
    </AppAccordion>
  })

  return (
    <>
      <h4 className="titlerow">
        Cards
        <AppButton 
          className="adminbtn"
          title="Add Card"
        />
      </h4>
      {paymentsrow}
    </>
  )
}
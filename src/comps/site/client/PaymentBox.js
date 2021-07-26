import React, { useContext } from 'react'
import { db } from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import AppAccordion from '../common/AppAccordion'
import AppButton from '../common/AppButton'

export default function PaymentBox(props) {

  const {id, cardName, cardNumber, cardHolder, expiryMonth, expiryYear, bank, cardImg, billingAddress} = props.el
  const {setShowAdd, setEditMode, setCardNumber, setCardholderName, setExpiryMonth, setExpiryYear, 
    setBillingAddress, setId} = props
  const {myUser, user} = useContext(StoreContext)
  const payments = myUser?.payments
  const addresses = myUser?.addresses
  const billAddressRef = addresses?.find(x => x.id===billingAddress)

  function removeCard() {
    let confirm = window.confirm('Are you sure you want to remove this card?')
    if(confirm) {
      let itemindex = payments?.findIndex(x => x.id === id)
      payments.splice(itemindex,1)
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      })
    }
  }
  function setEditCard() {
    setEditMode(true)
    setShowAdd(true)
    setCardNumber(cardNumber)
    setCardholderName(cardHolder) 
    setExpiryMonth(expiryMonth)
    setExpiryYear(expiryYear)
    setBillingAddress(billingAddress)
    setId(id)
  }

  return (
    <AppAccordion 
      title={
        <><img src={cardImg} alt=""/>{cardName} ****{cardNumber.slice(-4)}</>
      }>
      <div className="space-between">
        <div className="left">
          <div>
            <h6>Cardholder Name</h6>
            <span>{cardHolder}</span>
          </div>
          <div>
            <h6>Expiration Date</h6>
            <span>{`${expiryMonth<10?"0"+expiryMonth:expiryMonth}`}/{expiryYear}</span>
          </div>
          <div>
            <h6>Bank</h6>
            <span>{bank}</span>
          </div>
          <div className="btnscont">
            <AppButton 
              title="Edit Card"
              onClick={() => setEditCard()}
              className="adminbtn"
            />
            <AppButton 
              title="Remove Card"
              onClick={() => removeCard()}
              className="adminbtn"
            />
          </div>
        </div>
        <div className="right">
          <div>
            <h6>Billing Address</h6>
            <small>{billAddressRef.fname} {billAddressRef.lname}</small> 
            <small>{billAddressRef.address}</small>
            <small style={{display: billAddressRef?.aptunit?.length?"block":"none"}}>
              Apt. {billAddressRef?.aptunit}
            </small>
            <small>{billAddressRef.city}, {billAddressRef.provstate} {billAddressRef.postcode}</small>
            <small>{billAddressRef.country}</small>
            <small>{billAddressRef.phone}</small>
          </div>
        </div>
      </div>
    </AppAccordion>
  )
}
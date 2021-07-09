import React, {useContext, useRef, useState, useEffect} from 'react'
import AppButton from '../common/AppButton'
import {StoreContext} from '../../common/StoreContext'
import {AppInput, AppSelect} from '../../common/AppInputs'
import {db} from '../../common/Fire'
import PaymentBox from './PaymentBox'

export default function AccountWallet() {
  
  const {myUser, expiryMonths, expiryYears, user} = useContext(StoreContext)
  const [showAdd, setShowAdd] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('01')
  const [expiryYear, setExpiryYear] = useState(new Date().getFullYear())
  const [billingAddress, setBillingAddress] = useState('')
  const [cardType, setCardType] = useState('')
  const [cardImg, setCardImg] = useState('')
  const [id, setId] = useState('')
  const [editMode, setEditMode] = useState(false)
  const payments = myUser?.payments
  const addresses = myUser?.addresses
  const formRef = useRef()
  const currentMonth = new Date().getMonth()+1
  const currentYear = new Date().getFullYear()
  const cardObj = {
    bank: '',
    billingAddress,
    cardHolder: cardholderName,
    cardNumber,
    cardName: `${cardholderName}'s Card`,
    cardImg,
    code: '',
    expiryMonth: parseInt(expiryMonth,10),
    expiryYear: parseInt(expiryYear,10),
    id: db.collection('users').doc().id,
    nickname: 'My Amplify Card',
    primary: false
  }

  const paymentsrow = payments?.map((el) => {
    return <PaymentBox 
      el={el} 
      setShowAdd={setShowAdd} 
      setEditMode={setEditMode} 
      setCardNumber={setCardNumber}
      setCardholderName={setCardholderName}
      setExpiryMonth={setExpiryMonth}
      setExpiryYear={setExpiryYear}
      setBillingAddress={setBillingAddress}
      setId={setId}
    />
  })
  const expiryMonthOpts = expiryMonths.map(el => {
    return {name: `${el<10?"0"+el:el}`, value: el}
  })
  const expiryYearsOpts = expiryYears.map(el => {
    return {name: el, value: el}
  })
  const addressesOpts = addresses?.map(el => {
    return {name: `${el.address} - ${el.fname} ${el.lname}`, value: el.id}
  })

  function resetForm() {
    formRef.current.reset()
    setCardNumber('')
    setCardholderName('')
    setExpiryMonth(1)
    setExpiryYear(currentYear)
    setBillingAddress('')
  }
  function addEditCard() {
    if(parseInt(expiryMonth,10) < currentMonth && parseInt(expiryYear,10) === currentYear) {
      alert('Expiry date must be in the future.')
    }
    else if(!billingAddress.length && !cardNumber.length && !cardholderName.length) {
      window.alert('Please fill in all fields and make sure card does not already exist.')
    }
    else {
      if(!editMode && !payments.find(x => x.cardNumber===cardNumber)) { //add card
        payments.push(cardObj)
      }
      else { //edit card
        let itemindex = payments?.findIndex(x => x.id === id)
        payments[itemindex] = cardObj
      }
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      }).then(res => {
        resetForm()
        setShowAdd(false)
      })
    }
  }

  useEffect(() => {
    if(cardNumber.slice(0,1) === '6') {
      setCardType('Discover')
      setCardImg('https://i.imgur.com/twQ7QKd.jpg')
    } 
    else if(cardNumber.slice(0,1) === '4') {
      setCardType('Visa')
      setCardImg('https://i.imgur.com/qFu3UQf.jpg')
    }
    else if(cardNumber.slice(0,2) === '34' || cardNumber.slice(0,2) === '37') {
      setCardType('American Express')
      setCardImg('https://i.imgur.com/VCkBTjg.jpg')
    } 
    else if(cardNumber.slice(0,1) === '2' || cardNumber.slice(0,1) === '5') {
      setCardType('Master Card')
      setCardImg('https://i.imgur.com/VVJJmxs.jpg')
    } 
    else {
      setCardType('')
      setCardImg('')
    }
  },[cardNumber])

  return (
    <>
      <h4 className="titlerow">
        Cards
        <AppButton 
          className="userbtn"
          title="Add Card"
          onClick={() => {setEditMode(false);setShowAdd(true)}}
        />
      </h4>
      {paymentsrow}
      <div className="spacer"></div>
      <h4 className="titlerow">
        Gift Cards
        <AppButton 
          className="userbtn"
          title="Add Gift Card"
          onClick={() => null}
        />
      </h4>
      <div className={`addcardcover ${showAdd?"show":""}`}>
        <div className="addcardcont">
          <i className="fal fa-times" onClick={() => {setShowAdd(false);resetForm()}}></i>
          <h4>Add a Card</h4>
          <div className="main">
            <form ref={formRef} className="infocont" onSubmit={(e) => e.preventDefault()}>
              <AppInput 
                title="Card Number" 
                onChange={(e) => setCardNumber(e.target.value)}
                value={cardNumber.replace(/[^0-9]/g, "").replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')}
              />
              <AppInput 
                title="Cardholder Name"
                onChange={(e) => setCardholderName(e.target.value)}
                value={cardholderName}
              />
              <div className="selectscont">
                <h6>Expiration Date</h6>
                <div>
                  <AppSelect 
                    options={expiryMonthOpts} 
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    value={expiryMonth}
                    namebased
                  />
                  <AppSelect 
                    namebased
                    options={expiryYearsOpts}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    value={expiryYear}
                  />
                </div>
              </div>
              <div className="addresscont">
                <h5>Billing Address</h5>
                <AppSelect 
                  options={addressesOpts?[{name:'Please Choose', selected:true, value: '', disabled:true}, ...addressesOpts]:[]}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  value={billingAddress}
                  namebased
                />
              </div>
            </form>
            <div className="cardscont">
              <div className="carddetector">
                <h3>{cardType}</h3>
                <img src={cardImg} alt=""/>
              </div>
              <div className="acceptcont">
                <h5>Accepted Cards</h5>
                <img src="https://i.imgur.com/dEkxWsy.png" alt=""/>
              </div>
            </div>
          </div>
          <div className="btnscont">
            <AppButton 
              onClick={() => addEditCard()}
              title={!editMode?"Add Card":"Edit Card"} 
              className="userbtn"
            />
            <AppButton 
              title="Clear" 
              className="userbtn cancelbtn"
              onClick={() => resetForm()}
            />
            <AppButton 
              title="Cancel" 
              className="userbtn cancelbtn"
              onClick={() => {setShowAdd(false);resetForm()}}
            />
          </div>
        </div>
      </div>
    </>
  )
}
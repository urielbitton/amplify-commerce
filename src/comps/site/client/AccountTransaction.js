import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {StoreContext} from '../../common/StoreContext'

export default function AccountTransactions() {

  const {myOrders} = useContext(StoreContext)

  const transdaterow = myOrders?.map(el => {
    return <TransactionBox el={el} />
  })

  return (
    <>
      <h4 className="titlerow">Transactions</h4>
      <div className="transactioncont">
        {transdaterow}
      </div>
    </>
  )
}

export function TransactionBox(props) {

  const {orderDateCreated, paymentDetails, orderid, orderTotal} = props.el
  const {myUser, currencyFormat} = useContext(StoreContext)
  const payments = myUser?.payments
  const paymentsRef = payments.find(x => x.id === paymentDetails.paymentId)

  return (
    <div className="transdiv">
      <div className="header">
        <h5>
          {orderDateCreated.toDate().toString().split(' ')[1]}&nbsp;
          {orderDateCreated.toDate().toString().split(' ')[2]}&nbsp;
          {orderDateCreated.toDate().toString().split(' ')[3]}
        </h5>
      </div>
      <div className="content">
        <div>
          <h6>{paymentsRef.cardName} ***{paymentsRef.cardNumber.slice(-4)}</h6>
          <Link to={`/my-account/orders/${orderid}`}>Order #{orderid}</Link>
          <h6>Amplify Ltd.</h6>
        </div>
        <div>
          <h5>-{currencyFormat.format(orderTotal)}</h5>
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import './styles/AccountPayments.css'
import '../common/styles/ProductTable.css'
import AccountWallet from './AccountWallet'
import AccountTransactions from './AccountTransaction'

export default function AccountPayments()  {

  const paymentlinks = [
    {name: 'Wallet', url: '/my-account/payments/', exact: true},
    {name: 'Transactions', url: '/my-account/payments/transactions'},
  ]

  const paymenulinks = paymentlinks.map(({name,url,exact}) => {
    return <NavLink exact={exact} to={url} activeClassName="activemenulink">
      {name}<hr/>
    </NavLink>
  })

  return (
    <div className="accountpaymentspage">
      <h3 className="accounttitle">My Payments</h3>
      <div className="switchbar">
        {paymenulinks}
      </div>
      <div className="paymentscontent">
        <Route exact path="/my-account/payments/">
          <AccountWallet />
        </Route>
        <Route path="/my-account/payments/transactions/">
          <AccountTransactions />
        </Route>
      </div>
    </div>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'

export default function AccountTransactions() {
  return (
    <>
      <h4 className="titlerow">Transactions</h4>
      <div className="transactioncont">
        <div className="transdiv">
          <div className="header">
            <h5>May 28 2021</h5>
          </div>
          <div className="content">
            <div>
              <h6>Visa ***7906</h6>
              <Link to="">Order #7528928426433</Link>
              <h6>Amplify Ltd.</h6>
            </div>
            <div>
              <h5>-$190.00</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
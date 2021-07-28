import React, { useContext } from 'react'
import { StoreContext } from '../../common/StoreContext'
import { getCustomerArrById } from '../../common/UtilityFuncs'
import './styles/Dialogue.css'

export default function Dialogue(props) {

  const {allCustomers} = useContext(StoreContext)
  const {chatData, chatInfo} = props

  return (
    <div className="dialoguecont">
      <header>
        <div>
          <img src={getCustomerArrById(allCustomers, chatInfo.customerId).profimg} alt=""/>
          <h5>{getCustomerArrById(allCustomers, chatInfo.customerId).name}</h5>
        </div>
      </header>
      <section>

      </section>
    </div>
  )
}
import React, { useContext, useState } from 'react'
import './styles/Orders.css'
import {StoreContext} from '../../common/StoreContext'
import {AppInput} from '../../common/AppInputs'
import AppAccordion from '../../site/common/AppAccordion'
import AdminBtn from '../common/AdminBtn'

export default function EditOrder(props) {

  const {editOrdMode} = useContext(StoreContext)
  const {} = editOrdMode&&props.el
  const [tabPos, setTabPos] = useState(0)

  const tabshead = ['General', 'Products', 'Customer', 'Billing & Payment', 'Shipping', 'Order Updates']

  const tabsheadrow = tabshead?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => setTabPos(i)}
    >{el}<hr/></h5>
  })

  return (
    <div className="editorderspage">
      <div className="pagecont">
        <h3 className="pagetitle">{editOrdMode?"Edit Order":"Create Order"}</h3>
        <div className="tabsbar">
          <div className="tabstitles"> 
            {tabsheadrow}
          </div>
          <hr className="tabline"/>
        </div>
        <div className="ordercontent pagemaincontent">
          <div className={`editsection ${tabPos===0?"show":""}`}>
            <AppInput title="Order Number" placeholder="#123456"/>
            <AppInput title="Order Date" type="date"/>
          </div>
          <div className={`editsection ${tabPos===1?"show":""}`}>
            <h4>Order Products</h4>
            <AppAccordion title="Products">

            </AppAccordion>
            <div className="actionbtns">
              <AdminBtn title="New Product"/>
            </div>
          </div>
          <div className={`editsection ${tabPos===2?"show":""}`}>
            <h4>Customer Info</h4>
            <AppInput title="Name"/>
          </div>

          <div className="actionbtns">
            <AdminBtn title="Create Order"/>
            <AdminBtn title="Cancel"/>
          </div>
        </div>
      </div>
    </div>
  )
}
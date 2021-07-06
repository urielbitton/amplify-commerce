import React, {useContext, useState} from 'react'
import AdminBtn from '../common/AdminBtn'
import {AppInput} from '../../common/AppInputs'
import { StoreContext } from '../../common/StoreContext'
import {shipHeaders} from './arrays/arrays'

export default function Shipping() {

  const {editShipMode, setEditShipMode, allShipping} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(0)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')

  const headersrow = shipHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""} onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>
      {el.name}
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  })

  return (
    <div className="shippingpage">
      <div className="pagecont">
        <div className="titlesrow">
          <h4>Shipping</h4>
          <div className="flex">
            <AdminBtn title="New Method" url="/admin/store/add-shipping" onClick={() => setEditShipMode(false)}/>
            <AppInput 
              placeholder="Find a Method" 
              iconclass="fal fa-search" 
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className="shippingtablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              
            </div>
            <div className="foot">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
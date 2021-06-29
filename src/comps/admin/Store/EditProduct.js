import React, { useState } from 'react'
import './styles/Products.css'
import {AppInput, AppSelect} from '../../common/AppInputs'

export default function EditProduct(props) {

  const {id, name, imgs} = props.el
  const [tabPos, setTabPos] = useState(0)
  const [prodName, setProdName] = useState(name)

  const tabshead = ['General', 'Styles', 'Additional Info', 'Product Reviews']

  const tabsheadrow = tabshead?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => setTabPos(i)}
    >{el}<hr/></h5>
  })

  return (
    <div className="editproductpage">
      <div className="pagecont">
        <div className="editheader">
          <div className="editimgcont">
            <img src={imgs[0]} alt={name}/>
            <div className="editimgicon">
              <i className="fal fa-camera"></i>
            </div>
          </div>
          <AppInput 
            className="edittitle" 
            onChange={(e) => setProdName(e.target.value)} 
            value={prodName}
          />
        </div>
        <div className="tabsbar">
          <div className="tabstitles">
            {tabsheadrow}
          </div>
          <hr className="tabline"/>
        </div>
        <div className="editcontent">
          <div className={`editsection generalsection ${tabPos===0?"show":""}`}>
            <div className="editgrid">
              <AppInput title="Price"/>
              <AppSelect 
                title="Belong Type" 
                options={[{name:'Men'},{name:'Women'},{name:'Kids'}]}
              />
              <AppInput title="Brand"/>
              <AppInput title="Categories"/>
              <AppInput title="Collection"/>
              <AppInput title="Product Description"/>
            </div>
          </div>
          <div className={`editsection stylessection ${tabPos===1?"show":""}`}>
            <h4>Manage product styles</h4>
            <small>(different sizes and colors)</small>
          </div>
          <div className={`editsection additionalsection ${tabPos===2?"show":""}`}>
            <div className="editgrid">
              <label>
                <h6>Product Composition</h6>
                <textarea />
              </label>
              <label>
                <h6>Shipping & Returns Policies</h6>
                <textarea />
              </label>
              <AppSelect title="Product Taxing"/>
            </div>
          </div>
          <div className={`editsection reviewssection ${tabPos===3?"show":""}`}>
            <h4>Manage Product Reviews</h4>
            <small>Remove or sensor reviews</small>
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useContext, useState } from 'react'
import './styles/Products.css'
import {AppInput, AppSelect} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import AppAccordion from '../../site/common/AppAccordion'
import {sizeConverter, colorConverter} from '../../common/UtilityFuncs'
import {colorsOpts} from './arrays/arrays'
import {db} from '../../common/Fire'
import {StoreContext} from '../../common/StoreContext'

export default function EditProduct(props) {

  const {allProducts} = useContext(StoreContext)
  const {id, name, imgs, price, brand, belongs, categories, collection, descript, sku, sizes} = props.el
  const [tabPos, setTabPos] = useState(0)
  const [addingColor, setAddingColor] = useState(false)
  const [prodName, setProdName] = useState(name)
  const [prodPrice, setProdPrice] = useState(price)
  const [prodBelongs, setProdBelongs] = useState(belongs)
  const [prodBrand, setProdBrand] = useState(brand)
  const [prodCategs, setProdCategs] = useState(categories)
  const [prodCollection, setProdCollection] = useState(collection)
  const [prodDescription, setProdDescription] = useState(descript)
  const [prodSku, setProdSku] = useState(sku)
  const [newColorName, setNewColorName] = useState('#222')
  const [newColorStock, setNewColorStock] = useState(0)

  const tabshead = ['General', 'Styles', 'Additional Info', 'Product Reviews']

  const tabsheadrow = tabshead?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => setTabPos(i)}
    >{el}<hr/></h5>
  })
  const prodstylesrow = sizes?.map(el => {
    return <AppAccordion title={sizeConverter(el.name)} subtitle={`${el.colors?.length} colors`}>
        {
          el.colors?.map(el => {
            return <div className="colorsrow">
              <AppSelect options={colorsOpts} title="Color" value={(el.name)} namebased/>
              <AppInput title="Stock" type="number" value={el.stock}/>
            </div>
          })
        }
        {
          addingColor&&
          <div className="colorsrow">
            <AppSelect 
              title="Color" 
              options={colorsOpts} 
              onChange={(e) => setNewColorName(e.target.value)} 
              value={newColorName}
              namebased
            />
            <AppInput 
              title="Stock" 
              type="number" 
              onChange={(e) => setNewColorStock(e.target.value)} 
              value={newColorStock}
            />
          </div>
        }
        <div className="addcoloractions">
        <div 
          className={`coloradder ${addingColor?"save":""} ${addingColor && !newColorName && !newColorStock?"disabled":""}`} 
          title="Add Color" 
          onClick={() => {setAddingColor(prev => !prev);addingColor&&addColor(sizes.indexOf(el))}}
        >
          {
            addingColor?
            <small>Save</small>
            :<i className="fal fa-plus"></i>
          }
        </div>
        {addingColor&&<AdminBtn title="Cancel" nourl onClick={() => cancelAdd()} />}
      </div>
    </AppAccordion>
  })

  function addColor(sizeindex) {
    if(newColorName && newColorStock) {
      const colorObj = {
        name: newColorName,
        stock: +newColorStock,
        qtySold: 0
      }
      sizes[sizeindex].colors.push(colorObj)
      db.collection('products').doc('allproducts').update({
        allproducts: allProducts
      }).then(res => {
        window.alert('The product style was successfully added.')
        setNewColorName('')
        setNewColorStock(0)
      })
      .catch(err => window.alert('An error occured. Please try again.'))
    }
  }
  function cancelAdd() {
    setAddingColor(false)
    setNewColorName('')
    setNewColorStock(0)
  }

  return (
    <div className="editproductpage">
      <div className="pagecont">
        <h3 className="pagetitle">Edit Product</h3>
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
          <h6><span>Product ID: </span> {id}</h6>
        </div>
        <div className="tabsbar">
          <div className="tabstitles"> 
            {tabsheadrow}
          </div>
          <hr className="tabline"/>
        </div>
        <div className="editcontent">
          <div className={`editsection generalsection ${tabPos===0?"show":""}`}>
            <h4>Manage product information</h4>
            <div className="editgrid">
              <div className="inprow">
                <AppInput 
                  title="Price"
                  className="numberinp"
                  onChange={(e) => setProdPrice(e.target.value)}
                  value={prodPrice}
                  type="number"
                />
              </div>
              <div className="inprow">
                <AppSelect 
                  title="Belong Type" 
                  options={[{name:'Men'},{name:'Women'},{name:'Kids'},{name:'All'}]}
                  onChange={(e) => setProdBelongs(e.target.value)}
                  value={prodBelongs} 
                />
              </div>
              <div className="inprow">
                <AppInput 
                  title="Brand"
                  onChange={(e) => setProdBrand(e.target.value)}
                  value={prodBrand}
                />
              </div>
              <div className="inprow">
                <AppInput 
                  title="Categories"
                  onChange={(e) => setProdCategs(e.target.value)}
                  value={prodCategs}
                />
              </div>
              <div className="inprow">
                <AppInput 
                  title="Collection"
                  onChange={(e) => setProdCollection(e.target.value)}
                  value={prodCollection}
                />
              </div>
              <div className="inprow">
                <label className="apptextarea">
                  <h6>Product Description</h6>
                  <textarea onChange={(e) => setProdDescription(e.target.value)} value={prodDescription}/>
                </label>
              </div>
              <div className="inprow">
                <AppInput title="SKU" onChange={(e) => setProdSku(e.target.value)} value={prodSku}/>
              </div>
            </div>
          </div>
          <div className={`editsection stylessection ${tabPos===1?"show":""}`}>
            <h4>Manage product styles</h4>
            <div className="stylescontent">
              {prodstylesrow}
            </div>
            <div className="stylesactions">
              <AdminBtn title="Add Style"/>
            </div>
          </div>
          <div className={`editsection additionalsection ${tabPos===2?"show":""}`}>
            <h4>Additional product information</h4>
            <div className="editgrid">
              <div className="inprow">
                <label className="apptextarea">
                  <h6>Product Composition</h6>
                  <textarea />
                </label>
              </div>
              <div className="inprow">
                <label className="apptextarea">
                  <h6>Shipping & Returns Policies</h6>
                  <textarea />
                </label>
              </div>
              <div className="inprow">
                <AppSelect title="Product Taxing" options={[{name:'Enabled'},{name:'Disabled'}]}/>
              </div>
            </div>
          </div>
          <div className={`editsection reviewssection ${tabPos===3?"show":""}`}>
            <h4>Manage Product Reviews</h4>
            <small>Remove or sensor reviews</small>
          </div>
        </div>
        <div className="actionscontent">
          <AdminBtn title="Save Product" className="savebtn" solid/>
          <AdminBtn title="Delete Product" className="deletebtn" />
        </div>
      </div>
    </div>
  )
}
import React, { useContext, useEffect, useState } from 'react'
import './styles/Products.css'
import {AppInput, AppSelect, AppTextarea} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import AppAccordion from '../../site/common/AppAccordion'
import {sizeConverter, colorConverter} from '../../common/UtilityFuncs'
import {colorsOpts, sizeOpts} from './arrays/arrays'
import {db} from '../../common/Fire'
import firebase from 'firebase'
import {StoreContext} from '../../common/StoreContext'
import { useHistory, useLocation } from 'react-router-dom'

export default function EditProduct(props) {

  const {allProducts, editProdMode, setEditProdMode} = useContext(StoreContext)
  const {id, name, imgs, price, brand, belongs, categories, collection, descript, sku, sizes,
    composition, shippingReturns, rating, ratingsarr, reviews} = editProdMode&&props.el
  const [tabPos, setTabPos] = useState(0)
  const [addingStyle, setAddingStyle] = useState(false)
  const [addingColor, setAddingColor] = useState(false)
  const [prodName, setProdName] = useState(editProdMode?name:"")
  const [prodImg, setProdImg] = useState(editProdMode?imgs[0]:["https://i.imgur.com/IxUNUm5.png"])
  const [prodPrice, setProdPrice] = useState(editProdMode?price:"")
  const [prodBelongs, setProdBelongs] = useState(editProdMode?belongs:"Men")
  const [prodBrand, setProdBrand] = useState(editProdMode?brand:"")
  const [prodCategs, setProdCategs] = useState(editProdMode?categories:"")
  const [prodCollection, setProdCollection] = useState(editProdMode?collection:"")
  const [prodDescription, setProdDescription] = useState(editProdMode?descript:"")
  const [prodSku, setProdSku] = useState(editProdMode?sku:"")
  const [prodComposition, setProdComposition] = useState(editProdMode?composition:"")
  const [prodShipReturns, setProdShipReturns] = useState(editProdMode?shippingReturns:"")
  const [newSize, setNewSize] = useState('')
  const [newColorName, setNewColorName] = useState('#222')
  const [newColorStock, setNewColorStock] = useState(0)
  const [prodSizes, setProdSizes] = useState([])
  const [sizeChoose, setSizeChoose] = useState(false) 
  const location = useLocation()
  const history = useHistory()
  const allowAddSave = prodName && prodImg && prodPrice && prodBelongs && prodBrand && prodCategs &&
    prodCollection && prodDescription && prodSku && prodComposition && prodShipReturns
  const [newColorsArr, setNewColorsArr] = useState([])

  const tabshead = ['General', 'Styles', 'Additional Info', 'Product Reviews']

  const productObj = {
    id: editProdMode?id:db.collection('products').doc().id,
    name: prodName,
    imgs: prodImg,
    price: +prodPrice,
    brand: prodBrand,
    belongs: prodBelongs,
    categories: editProdMode?prodCategs:prodCategs.split(','),
    collection: editProdMode?prodCollection:prodCollection.split(','),
    descript: prodDescription,
    sku: prodSku,
    sizes: prodSizes,
    composition: prodComposition,
    shippingReturns: prodShipReturns,
    rating: editProdMode?rating:0, 
    ratingsarr: editProdMode?ratingsarr:[],
    reviews: editProdMode?reviews:[]
  }

  const tabsheadrow = tabshead?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => setTabPos(i)}
    >{el}<hr/></h5>
  })
  const prodstylesrow = (editProdMode?sizes:prodSizes)?.map(el => {
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
            <small>Add</small>
            :<i className="fal fa-plus"></i>
          }
        </div>
        {addingColor&&<AdminBtn title="Cancel" nourl onClick={() => cancelAddColor()} />}
      </div>
    </AppAccordion>
  })

  const addedcolorsrow = newColorsArr?.map(el => {
    return <div className="colorsrow">
    <div className="inprow">
      <AppInput 
        title="Color" 
        value={colorConverter(el.name)}
        disabled
      />
    </div>
    <div className="inprow">
      <AppInput 
        title="Stock" 
        value={el.stock}
        type="number"
        disabled
      />
    </div>
  </div>
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
  function newAddColor() {
    setNewColorsArr(prev => [...prev, {name:newColorName,stock:newColorStock, qtySold:0}])
    setNewColorName('')
    setNewColorStock(0)
  }
  function createStyle() {
    setProdSizes(prev => [...prev,{name:newSize,colors:newColorsArr}])
    setAddingColor(false)
    setNewColorName('')
    setNewColorStock(0)
  }
  function cancelAddColor() {
    setAddingColor(false)
    setNewColorName('')
    setNewColorStock(0)
  }
  function addProduct() {
    if(!!allowAddSave) {
      db.collection('products').doc('allproducts').update({
        allproducts: firebase.firestore.FieldValue.arrayUnion(productObj)
      }).then(res => {
        window.alert('The product was successfully added to your store.')
        history.push('/admin/store/products')
      }).catch(err => window.alert('An error occured while adding product. Please try again.'))
    }
    else {
      window.alert('Please fill in all required fields.')
    }
  }
  function cancelAdd() {

  }
  function deleteProduct() {

  }
  function saveProduct() {
    if(!!allowAddSave) {
      const productindex = allProducts.findIndex(x => x.id === id)
      allProducts[productindex] = productObj
      db.collection('products').doc('allproducts').update({
        allproducts: allProducts
      }).then(res => {
        window.alert('The product was successfully saved.')
        history.push('/admin/store/products')
      }).catch(err => window.alert('An error occured while saving product. Please try again.'))
    }
    else {
      window.alert('Please fill in all required fields.')
    }
  }

  useEffect(() => {
    if(location.pathname.includes('/edit-product')) {
      setEditProdMode(true)
    }
  },[])

  useEffect(() => {
    if(!editProdMode) {
      setProdName('')
      setProdImg(['https://i.imgur.com/IxUNUm5.png'])
      setProdPrice('')
      setProdBelongs('')
      setProdBrand('')
      setProdCategs('')
      setProdCollection('')
      setProdDescription('')
      setProdSku('')
      setProdComposition('')
      setProdShipReturns('')
    }
  },[editProdMode])

  useEffect(() => {
    newSize?setSizeChoose(true):setSizeChoose(false)
  },[newSize])
  useEffect(() => {
    sizeChoose?setAddingColor(true):setAddingColor(false)
  },[sizeChoose])

  return (
    <div className="editproductpage">
      <div className="pagecont">
        <h3 className="pagetitle">{editProdMode?"Edit Product":"Add Product"}</h3>
        <div className="editheader">
          <div className="editimgcont">
            <img src={prodImg} alt={name}/>
            <div className="editimgicon">
              <i className="fal fa-camera"></i>
            </div>
          </div>
          <AppInput 
            className="edittitle" 
            onChange={(e) => setProdName(e.target.value)} 
            value={prodName}
          />
          {editProdMode&&<h6><span>Product ID: </span> {id}</h6>}
        </div>
        <div className="tabsbar">
          <div className="tabstitles"> 
            {tabsheadrow}
          </div>
          <hr className="tabline"/>
        </div>
        <div className="editcontent">
          {/*General Section*/}
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
                  onChange={(e) => setProdCategs(e.target.value.replaceAll(' ',''))}
                  value={prodCategs}
                />
              </div>
              <div className="inprow">
                <AppInput 
                  title="Collection"
                  onChange={(e) => setProdCollection(e.target.value.replaceAll(' ',''))}
                  value={prodCollection}
                />
              </div>
              <div className="inprow">
                <AppTextarea 
                  title="Product Description" 
                  onChange={(e) => setProdDescription(e.target.value)} 
                  value={prodDescription} 
                />
              </div>
              <div className="inprow">
                <AppInput 
                  title="SKU" 
                  onChange={(e) => setProdSku(e.target.value)} 
                  value={prodSku}
                />
              </div>
            </div>
          </div>
          {/*Styles Section*/}
          <div className={`editsection stylessection ${tabPos===1?"show":""}`}>
            <h4>Manage product styles</h4>
            <div className="stylescontent">
              {prodstylesrow}
              {
                addingStyle&&
                <div className="newstylecont">
                <div className="inprow">
                  <AppSelect 
                    title="Product Size" 
                    options={sizeOpts} 
                    onChange={(e) => setNewSize(e.target.value)}
                    namebased
                  />
                </div>
                {addedcolorsrow}
                {
                  addingColor&&
                  <div className="colorsrow">
                    <div className="inprow">
                      <AppSelect 
                        title="Color" 
                        options={colorsOpts} 
                        onChange={(e) => setNewColorName(e.target.value)}
                        namebased
                      />
                    </div>
                    <div className="inprow">
                      <AppInput 
                        title="Stock" 
                        onChange={(e) => setNewColorStock(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>
                }
                {
                  sizeChoose&&
                  <div className="addcoloractions">
                    <AdminBtn
                      title={addingColor?"Add Color":<i className="fal fa-plus"></i>} 
                      className={`coloradder ${addingColor?"save":"round"} ${addingColor && !newColorName && !newColorStock?"disabled":""}`}
                      onClick={() => addingColor&&newAddColor()}
                      nourl
                      solid 
                    />
                    {
                      addingColor&&
                      <AdminBtn 
                        title="Cancel"
                        onClick={() => setAddingColor(false)}
                        nourl
                      />
                    }
                  </div>
                }
                <div className="newstylesaction">
                  <AdminBtn 
                    title="Create" 
                    solid 
                    nourl
                    className={!newSize?"disabled":""} 
                    onClick={() => createStyle()}
                  />
                  <AdminBtn 
                    title="Cancel" 
                    nourl 
                    onClick={() => setAddingStyle(false)}
                  />
                </div>
              </div>
              }
            </div>
            <div className="stylesactions">
              <AdminBtn title="Add Style" nourl onClick={() => setAddingStyle(true)}/>
            </div>
          </div>
          {/*Additional Info Section*/}
          <div className={`editsection additionalsection ${tabPos===2?"show":""}`}>
            <h4>Additional product information</h4>
            <div className="editgrid">
              <div className="inprow">
                <AppTextarea 
                  title="Product Composition" 
                  onChange={(e) => setProdComposition(e.target.value)}
                  value={prodComposition}
                />
              </div>
              <div className="inprow">
                <AppTextarea 
                  title="Shipping & Returns Policies"
                  onChange={(e) => setProdShipReturns(e.target.value)}
                  value={prodShipReturns}
                />
              </div>
              <div className="inprow">
                <AppSelect title="Product Taxing" options={[{name:'Enabled'},{name:'Disabled'}]}/>
              </div>
            </div>
          </div>
          {/*Reviews Section*/}
          <div className={`editsection reviewssection ${tabPos===3?"show":""}`}>
            <h4>Manage Product Reviews</h4>
            <small>Remove or sensor reviews</small>
          </div>
        </div>
        <div className="actionscontent">
          <AdminBtn 
            title={editProdMode?"Save Product":"Add Product"} 
            nourl 
            className="savebtn" 
            solid
            onClick={() => editProdMode?saveProduct():addProduct()}
          />
          <AdminBtn 
            title={editProdMode?"Delete Product":"Cancel"} 
            nourl 
            className="deletebtn" 
            onClick={() => editProdMode?deleteProduct():cancelAdd()}
          />
        </div>
      </div>
    </div>
  )
}
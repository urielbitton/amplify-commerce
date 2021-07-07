import React, { useContext, useEffect, useState } from 'react'
import './styles/EditProduct.css'
import {AppInput, AppSelect, AppTextarea} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {db} from '../../common/Fire'
import firebase from 'firebase'
import {StoreContext} from '../../common/StoreContext'
import { useHistory, useLocation } from 'react-router-dom'
import AddStyles from './AddStyles'

export default function EditProduct(props) {

  const {allProducts, editProdMode, setEditProdMode} = useContext(StoreContext)
  const {id, name, imgs, price, brand, belongs, categories, collection, descript, sku, sizes,
    composition, shippingReturns, rating, ratingsarr, reviews} = editProdMode&&props.el
  const [tabPos, setTabPos] = useState(0)
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
  const [prodSizes, setProdSizes] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const generateid = db.collection('products').doc().id
  const storageRef = firebase.storage().ref('admin/products').child(`product-${generateid}`) 
  const location = useLocation()
  const history = useHistory()
  const allowAddSave = prodName && prodImg && prodPrice && prodBelongs && prodBrand && prodCategs &&
    prodCollection && prodDescription && prodSku && prodComposition && prodShipReturns

  const tabshead = ['General', 'Styles', 'Additional Info', 'Product Reviews']

  const productObj = {
    id: editProdMode?id:generateid,
    name: prodName,
    imgs: prodImg,
    price: +prodPrice,
    brand: prodBrand,
    belongs: prodBelongs,
    categories: prodCategs,
    collection: prodCollection,
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

  function addProduct() {
    if(!!allowAddSave) {
      productObj.categories = prodCategs.split(',')
      productObj.collection = prodCollection.split(',')
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
    const confirm = window.confirm('Are you sure you want to cancel adding a new product?')
    if(confirm) {
      history.push('/admin/store/products')
    }
  }
  function deleteProduct() {
    const confirm = window.confirm('Are you sure you want to delete this product?')
    if(confirm) {
      let itemindex = allProducts.findIndex(x => x.id === id)
      allProducts.splice(itemindex,1)
      db.collection('products').doc('allproducts').update({
        allproducts: allProducts
      }).then(() => history.push('/admin/store/products'))
    }
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
  function uploadImg(e) {
    const file = e.target.files[0]
    if(file) {
      const task = storageRef.put(file)
      task.on("stat_changes", 
        function progress(snap) {
          //setLoading(true)
          //const percent = (snap.bytesTransferred / snap.totalBytes) * 100
          //loadingRef.current.style.width = percent + '%'
        },
        function error() {
          window.alert('An error has occured. Please try again later.')
        },
        function complete() {
          //setLoading(false)
          storageRef.getDownloadURL().then(url => {
            setImgUrl(url)
            db.collection('products').doc('allproducts').update({
              allproducts: allProducts
            })
          })
        }
      )
    }
  }

  useEffect(() => {
    if(location.pathname.includes('edit-product'))
      setEditProdMode(true)
    else 
    setEditProdMode(false)
  },[location])

  useEffect(() => {
    if(!editProdMode) {
      setProdName('')
      setProdImg(['https://i.imgur.com/IxUNUm5.png'])
      setProdPrice('')
      setProdBelongs('')
      setProdBrand('')
      setProdCategs('')
      setProdSizes([])
      setProdCollection('')
      setProdDescription('')
      setProdSku('')
      setProdComposition('')
      setProdShipReturns('')
    }
    return() => setEditProdMode(false)
  },[editProdMode])

  useEffect(() => {
    if(imgUrl.length) {
      setProdImg([imgUrl])
    }
  },[imgUrl])

  return (
    <div className="editproductpage">
      <div className="pagecont">
        <h3 className="pagetitle">{editProdMode?"Edit Product":"Add Product"}</h3>
        <div className="editheader">
          <div className="editimgcont">
              <label>
                <input 
                  style={{display:'none'}} 
                  type="file" 
                  onChange={(e) => uploadImg(e)}
                />
                <img src={imgUrl.length?imgUrl:prodImg} alt={name}/>
                <div className="editimgicon">
                  <i className="fal fa-camera"></i>
                </div>
              </label>
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
                  value={prodPrice>=0?prodPrice:0}
                  type="number"
                  min={0}
                />
              </div>
              <div className="inprow">
                <AppSelect 
                  title="Belong Type" 
                  options={[{name:'Choose One...'},{name:'Men'},{name:'Women'},{name:'Kids'},{name:'All'}]}
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
            <AddStyles setProdSizes={setProdSizes} prodSizes={prodSizes} sizes={sizes} />
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
            clickEvent 
            className="savebtn" 
            solid
            onClick={() => editProdMode?saveProduct():addProduct()}
          />
          <AdminBtn  
            title={editProdMode?"Delete Product":"Cancel"} 
            clickEvent 
            className="deletebtn" 
            onClick={() => editProdMode?deleteProduct():cancelAdd()}
          />
        </div>
      </div>
    </div>
  )
}
import React, { useContext, useEffect, useState } from 'react'
import './styles/EditProduct.css'
import {AppInput, AppSelect, AppTextarea} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import {db} from '../../common/Fire'
import firebase from 'firebase'
import {StoreContext} from '../../common/StoreContext'
import { useHistory, useLocation } from 'react-router-dom'
import AddStyles from './AddStyles'
import PageTitle from '../common/PageTitle'
import TabsBar from '../common/TabsBar'

export default function EditProduct(props) {

  const {editProdMode, setEditProdMode, setNotifs} = useContext(StoreContext)
  const {id, name, imgs, price, brand, belongs, categories, collection, descript, sku, sizes,
    composition, shippingReturns, rating, ratingsarr, reviews} = editProdMode&&props.el
  const [tabPos, setTabPos] = useState(0)
  const [prodName, setProdName] = useState("")
  const [prodImg, setProdImg] = useState(["https://i.imgur.com/IxUNUm5.png"])
  const [prodPrice, setProdPrice] = useState("")
  const [prodBelongs, setProdBelongs] = useState("")
  const [prodBrand, setProdBrand] = useState("")
  const [prodCategs, setProdCategs] = useState("")
  const [prodCollection, setProdCollection] = useState("")
  const [prodDescription, setProdDescription] = useState("")
  const [prodSku, setProdSku] = useState("")
  const [prodComposition, setProdComposition] = useState("")
  const [prodShipReturns, setProdShipReturns] = useState("")
  const [prodSizes, setProdSizes] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const generateid = db.collection('products').doc().id
  const storageRef = firebase.storage().ref('admin/products').child(`product-${generateid}`) 
  const location = useLocation()
  const history = useHistory()
  const allowCreate = prodName && prodImg && prodPrice && prodBelongs && prodBrand && prodCategs &&
    prodCollection && prodDescription && prodSku && prodComposition && prodShipReturns
  const pagetitle = editProdMode?"Edit A Product":"Create A Product"

  const tabsTitles = ['General', 'Styles', 'Additional Info', 'Product Reviews']

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

  function addProduct() {
    if(!!allowCreate) {
      productObj.categories = prodCategs.split(',')
      productObj.collection = prodCollection.split(',')
      db.collection('products').doc(generateid).set(
        productObj
      ).then(res => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Product Created',
          icon: 'fal fa-plus',
          text: `The product was successfully added to your store.`,
          time: 5000
        }])
        history.push('/admin/store/products')
      }).catch(err => window.alert('An error occured while adding product. Please try again.'))
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all fields denoted with a *`,
        time: 5000
      }])
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
      db.collection('products').doc(id).delete()
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Product Deleted',
          icon: 'fal fa-trash-alt',
          text: `The product was successfully deleted from your store.`,
          time: 5000
        }])
        history.push('/admin/store/products')
      })
    }
  }
  function saveProduct() {
    if(!!allowCreate) {
      db.collection('products').doc(id).update(productObj)
      .then(res => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Product Saved',
          icon: 'fal fa-save',
          text: `The product has been saved.`,
          time: 5000
        }])
        history.push('/admin/store/products')
      }).catch(err => window.alert('An error occured while saving product. Please try again.'))
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all fields denoted with a *`,
        time: 5000
      }])
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

    return () => setEditProdMode(false)
  },[location])

  useEffect(() => {
    setProdName(editProdMode?name:'')
    setProdImg(editProdMode?imgs[0]:['https://i.imgur.com/IxUNUm5.png'])
    setProdPrice(editProdMode?price:'')
    setProdBelongs(editProdMode?belongs:'')
    setProdBrand(editProdMode?brand:'')
    setProdCategs(editProdMode?categories.join(', '):'')
    setProdSizes(editProdMode?sizes:[])
    setProdCollection(editProdMode?collection.join(', '):'')
    setProdDescription(editProdMode?descript:'')
    setProdSku(editProdMode?sku:'')
    setProdComposition(editProdMode?composition:'')
    setProdShipReturns(editProdMode?shippingReturns:'')
  },[editProdMode])

  useEffect(() => {
    if(imgUrl.length) {
      setProdImg([imgUrl])
    }
  },[imgUrl])

  return (
    <div className="editproductpage">
      <PageTitle title={pagetitle}/>
      <div className="pagecont">
        <h3 className="pagetitle">{pagetitle}</h3>
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
            placeholder="Enter Product Name"
            onChange={(e) => setProdName(e.target.value)} 
            value={prodName}
          />
          {editProdMode&&<h6><span>Product ID: </span> {id}</h6>}
        </div>
        <TabsBar 
          tabsTitles={tabsTitles}
          tabPos={tabPos}
          setTabPos={setTabPos}
        />
        <div className="editcontent">
          {/*General Section*/}
          <div className={`tabsection editsection generalsection ${tabPos===0?"show":""}`}>
            <h4>Manage product information</h4>
            <div className="editgrid">
              <div className="inprow">
                <AppInput 
                  title="Price"
                  className="currencyinp"
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
          <div className={`tabsection editsection stylessection ${tabPos===1?"show":""}`}>
            <h4>Manage product styles</h4>
            <AddStyles setProdSizes={setProdSizes} prodSizes={prodSizes} sizes={sizes} />
          </div>
          {/*Additional Info Section*/}
          <div className={`tabsection editsection additionalsection ${tabPos===2?"show":""}`}>
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
          <div className={`tabsection editsection reviewssection ${tabPos===3?"show":""}`}>
            <h4>Manage Product Reviews</h4>
            <small>Remove or moderate reviews</small>
          </div>
        </div>
        <div className="actionbtns">
          <AdminBtn 
            title={editProdMode?"Save Product":"Add Product"} 
            clickEvent 
            className={`savebtn ${!allowCreate?"disabled":""}`} 
            solid
            onClick={() => editProdMode?saveProduct():addProduct()}
          />
          <AdminBtn 
            title="Delete Product" 
            solid 
            className="deletebtn" 
            hideBtn={!editProdMode}
            clickEvent 
            onClick={() => editProdMode&&deleteProduct()}
          />
          <AdminBtn  
            title="Cancel"
            clickEvent 
            onClick={() => cancelAdd()}
          />
        </div>
      </div>
    </div>
  )
}
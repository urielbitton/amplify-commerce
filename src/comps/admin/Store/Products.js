import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../common/StoreContext'
import {prodHeaders} from './arrays/arrays'
import { Link, useHistory } from 'react-router-dom'
import {db} from '../../common/Fire'
import PageTitle from '../common/PageTitle'
import PageTitlesRow from '../common/PageTitlesRow'
import PageStarter from '../common/PageStarter'
import {setDB} from '../../common/services/CrudDb'

export default function Products() {

  const {allProducts, currencyFormat, setEditProdMode, setNotifs} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(0)
  const [keyword, setKeyword] = useState('')
  const clean = text => text?.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const reduceStock = (el) => el.sizes?.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.stock,0),0)
  const reduceSold = (el) => el.sizes?.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.qtySold,0),0)
  const history = useHistory()
  const allProdsFilter = allProducts?.filter(x => (pattern.test(clean(x.name)) || pattern.test(x.price) || x.id === keyword || 
    x.categories.some(x => x===keyword) || x.collection.some(x => x===keyword) || pattern.test(x.belongs)))
  const showTable = allProducts.length?"block":"none"
  const updateID = db.collection('updates').doc().id
 
  const headersrow = prodHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  const allprodsrow = allProdsFilter?.sort((a,b) => {
    if(sort === 1) {
      if(a.name > b.name && asc) return 1 
      else return -1
    }
    else if(sort === 2) {
      if(asc) return b.price - a.price
      else return a.price - b.price
    }
    else if(sort === 3) {
      if(asc) return reduceStock(b) - reduceStock(a)
      else return reduceStock(a) - reduceStock(b)
    }
    else if(sort === 4) {
      if(asc) return reduceSold(b) - reduceSold(a)
      else return reduceSold(a) - reduceSold(b)
    }
    else if(sort === 5) {
      if(asc) return (reduceSold(b)*b.price) - (reduceSold(a)*a.price)
      else return (reduceSold(a)*a.price) - (reduceSold(b)*b.price)
    }
    else if(sort === 6) {
      if(asc) return reduceStock(b) - reduceStock(a)
      else return reduceStock(a) - reduceStock(b)
    }
  })
  .map((el,i) => {
    return <div className="proditem">
      <h5>{i+1}</h5>
      <h5>
        <img src={el.imgs[0]} alt={el.name}/>
        { reduceSold(el)>10&&
          <i title="hot selling product" className={`fas fa-badge-check ${reduceSold(el)> 10?"hot":""}`}></i>
        } 
      </h5>
      <h5><Link to={`/admin/store/edit-product/${el.id}`}>{el.name}</Link></h5>
      <h5>{currencyFormat.format(el.price)}</h5>
      <h5>{reduceStock(el)}</h5>
      <h5>{reduceSold(el)}</h5>
      <h5>{currencyFormat.format(reduceSold(el) * el.price)}</h5>
      <h5 className={`stockcont ${reduceStock(el)>5?"instock":reduceStock(el)>0?"lowstock":"nostock"}`}>
        <span>{reduceStock(el)>5?"In Stock":reduceStock(el)>0?"Low Stock":"Out Of Stock"}</span>
      </h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===el.id?0:el.id);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${el.id===showOpts?"show":""}`}> 
          <div title="Edit Product" onClick={() => editProduct(el.id)}><i className="far fa-edit"></i></div>
          <div title="Delete Product" onClick={() => deleteProduct(el.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Product Info" onClick={() => infoProduct()}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function editProduct(prodid) {
    setEditProdMode(true)
    history.push(`/admin/store/edit-product/${prodid}`)
  }
  function deleteProduct(id) {
    const confirm = window.confirm('Are you sure you want to remove this product? This will remove the product from customers cart and wishlists.')
    if(confirm) {
      db.collection('products').doc(id).delete()
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Product Deleted',
          icon: 'fal fa-trash-alt',
          text: `The product has been deleted from your store.`,
          time: 5000
        }]) 
        setDB('updates', updateID, {
          color: '#0088ff',
          date: new Date(),
          descript: `The product has been deleted.`,
          icon: 'fal fa-tshirt',
          id: updateID,
          read: false,
          title: 'Product Deleted',
          url: `/admin/store/products` 
        })
      })
    }
  }
  function infoProduct() {

  }

  useEffect(() => {
    window.onclick = () => setShowOpts(0)
  },[])

  return (
    <div className="productspage">
      <PageTitle title="Products"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Products"
          btnTitle="New Product"
          btnUrl="/admin/store/add-product"
          searchPlaceholder="Find a Product"
          setKeyword={setKeyword}
        />
        <PageStarter 
          subtitle="You have no products yet."
          title="Create a Product"
          img="https://i.imgur.com/LDkx0CT.png"
          btnText="Create Product"
          btnUrl="/admin/store/add-product"
          hide={allProducts.length}
        />
        <div className="productstablecont" style={{display:showTable}}>
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allprodsrow}
            </div>
            <div className="foot">
              <h5><span>{allProdsFilter?.length}</span> total product{allProdsFilter?.length>1?"s":""}</h5>
              <h5><span>{allProdsFilter?.reduce((a,b) => a + b.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + b.qtySold,0),0),0)}</span> quantities sold</h5>
              <h5><span>{currencyFormat.format(allProdsFilter?.reduce((x,y) => x + y.sizes.reduce((a,b) => a + b.colors.reduce((a,b) => a + (b.qtySold*y.price),0),0),0))}</span> total earnings</h5>
              <h5><span>{allProdsFilter?.reduce((a,b) => a + b.sizes.some(x => x.colors.some(x => x.stock>0?1:0),0),0)}</span> Products In Stock</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
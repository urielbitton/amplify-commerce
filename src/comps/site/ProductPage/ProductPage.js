import React, { useContext, useEffect, useState } from 'react'
import PageBanner from '../common/PageBanner'
import './styles/ProductPage.css'
import AddToCart from '../common/AddToCart'
import AddToWish from '../common/AddToWish'
import {AppSelect} from '../../common/AppInputs'
import {sizeConverter, colorConverter} from '../../common/UtilityFuncs'
import Ratings from '../../common/Ratings'
import AppAccordion from '../common/AppAccordion'
import ProductReviews from './ProductReviews'
import { StoreContext } from '../../common/StoreContext'
import ProductBox from '../common/ProductBox'

export default function ProductPage(props) {

  const {allProducts} = useContext(StoreContext)
  const {id, name, price, rating, ratingsarr, imgs, instock, belongs, colors, stock, sizes,
    collection, descript, reviews, categories
  } = props.el
  const [activeImg, setActiveImg] = useState(imgs[0])
  const [chosenColor, setChosenColor] = useState('')
  const [chosenSize, setChosenSize] = useState('')
  const [secTab, setSecTab] = useState(0)
  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}) 

  const socialarr = [
    {name: 'Facebook',icon: 'fab fa-facebook-f', url: ''},
    {name: 'Twitter',icon: 'fab fa-twitter', url: ''},
    {name: 'LinkedIn',icon: 'fab fa-linkedin-in', url: ''},
    {name: 'Pinterest',icon: 'fab fa-instagram', url: ''},
    {name: 'Pinterest',icon: 'fab fa-pinterest', url: ''}  
  ]
  const imgsrow = imgs?.map(el => {
    return <img src={el} alt="" onClick={() => setActiveImg(el)} key={el}/>
  })
  const coloroptions = colors?.map(el => {
    return {name:colorConverter(el)}
  })
  const sizeoptions = sizes?.map(el => {
    return {name:sizeConverter(el)}
  })
  const socialshares = socialarr.map(({name,icon,url}) => {
    return <i className={icon} title={name} key={name}></i>
  })
  //find at least 2 matching properties:
  //.filter(el => el.colors.filter(x => colors.includes(x)).length > 1)
  const similarprodsrow = allProducts
  ?.filter(el => el.categories.some(x => categories.includes(x)) && el.belongs === belongs && el.id!==id)
  .slice(0,4)
  .map(el => {
    return <ProductBox el={el} />
  })

  function magnifyImg(e) {
      
  }

  useEffect(() => {
    setActiveImg(imgs[0])
  },[id])

  return (
    <div className="productpage">
      <PageBanner 
        title={name}
      />
      <div className="grid xgrid">
        <div className="mainprodcont">
          <div className="imgscontent">
            <div className="imgcontainer">
              <div 
                className="imgcont" 
                style={{backgroundImage: `url(${activeImg})`}} 
                onMouseMove={(e) => magnifyImg(e)}
              >
            </div>
            </div>
            <div className="imgsrow">
              {imgsrow}
            </div>
          </div>
          <div className="infocont">
            <h2>{name}</h2>
            <h6 className="productid">Product ID: {id}</h6>
            <h3 className="price">{currencyFormat.format(price)}</h3>
            <div className="prodactionsrow">
              <AddToCart el={props.el} chosenColor={chosenColor} chosenSize={chosenSize} />
              <AddToWish el={props.el} />
              <AppSelect 
                options={[{name: 'Choose a Color'},...coloroptions]}
                onChange={(e) => setChosenColor(e.target.value)}
              />
              <AppSelect 
                options={[{name: 'Choose a Size'},...sizeoptions]}
                onChange={(e) => setChosenSize(e.target.value)}
              />
            </div>
            <p className="description">{descript}</p>
            <hr/>
            <div className="productinfolist">
              <div><h6>Collection</h6><span>{collection?.join(', ')}</span></div>
              <div><h6>Categories</h6><span>{categories?.join(', ')}</span></div>
              <div><h6>Brand Name</h6><span>-</span></div>
              <div><h6>Stock Status</h6><span className={instock?"instock":"nostock"}>{instock?"In Stock":"Out of Stock"}</span></div>
              <div><h6>Share Product</h6><span>{socialshares}</span></div>
              <div><h6>Rating</h6><span><Ratings rating={rating} /><small>({ratingsarr.length})</small></span></div>
              <div className="accordioncont">
                <AppAccordion title="Product Description" className="proddescript">
                <div>
                  <p>Product dimensions: length - 67 cm, width - 20 cm, height - 14 cm.</p>
                  <p>Material: Cotton (20%) and Synthetic Wool (75%) Fiber (5%)</p>
                  <p>Instruction: Washable in machine, use hot water. 30 minute machine dry. Material stretched</p>
                  <p>*Made from high quality material in the U.S.</p>
                </div>
                </AppAccordion>
                <AppAccordion title="Shipping & Returns" className="prodshipping">
                  <div>
                    <p>Express and regular shipping is available for this product. </p>
                    <p>Free shipping is offered on all orders of $50 or more</p>
                    <p>This product is fully refundable within 30 days of purchase</p>
                    <p>We will handle all return and shipping fees.</p>
                  </div>
                </AppAccordion>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="header">
            <h2 className={secTab===0?"active":""} onClick={() => setSecTab(0)}>Customer Reviews ({reviews.length})</h2>
            <h2 className={secTab===1?"active":""} onClick={() => setSecTab(1)}>Product Details</h2>
          </div>
          <div className="content">
            {
              secTab===0?
              <ProductReviews reviews={reviews} />:
              <div className="productdetailscont">
              <p>No product details available right now</p>
              </div>
            }
          </div>
        </div>
        <div className="similarprodscont">
          <h2>Similar Products ({similarprodsrow.length})</h2>
          <div className="productsrow">
            {similarprodsrow}
          </div>
        </div>
      </div>
    </div>
  )
}
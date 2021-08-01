import { Link } from "react-router-dom";

export const ordersFaq = [
  {
    title: 'Creating Orders', 
    text: <>Visit the <Link to="/admin/orders/add-order">Create Order</Link> page to create a new order.</>
  },
  {
    title: 'Editing Orders', 
    text: <>To edit an order, visit the <Link to="/admin/orders">orders</Link> page and click on 
      the <i className="fal fa-ellipsis-h"></i> options icon at the end of that order's row. On the menu, 
      select the <i className="far fa-edit"></i> icon.</>
  }
]

export const productsFaq = [
  {
    title: 'Creating Products', 
    text: <>Creating products and adding them to your store is a very simple process. Head over to
      the <Link to="/admin/store/add-product">New Product</Link> page. On this page you can add all the relavant 
      details of a product, including its name, images, sizes and colors, and so on.</>
  },
  {
    title: 'Editing Products', 
    text: <>Editing a product involves the same steps as editing orders but on 
    the <Link to="/admin/store/products">Products</Link> page.</>
  }
]

export const couponsFaq = [
  {
    title: 'Creating Coupons', 
    text: <>You can create a coupon by heading to the <Link to="/admin/store/add-coupon">Create Coupon</Link> page
    and choosing the type of coupon you want. It will then automatically be activate on your store for customers
    consume.</>
  }
]

export const shippingFaq = [
  {
    title: 'Creating Shipping Methods', 
    text: <>Shipping methods for order deliveries can be set up by visiting the 
    <Link to="/admin/store/add-shipping">Create Shipping Method</Link> page. Customers checking out with items
    will be presented with the option to choose amongst the shipping methods you create.</>
  }
]

export const accSettingssFaq = [
  {
    title: 'Creating Users', 
    text: <></>
  },
  {
    title: 'Deleting Users', 
    text: <></>
  }
]

export const storeSettingssFaq = [
  {
    title: '', 
    text: <></>
  }
]

export const genSettingssFaq = [
  {
    title: 'Color Themes', 
    text: <></>
  },
  {
    title: 'Dark Mode', 
    text: <></>
  }
]
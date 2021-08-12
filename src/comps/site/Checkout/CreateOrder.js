import firebase from 'firebase'
import {db} from '../../common/Fire'
import referProduct from '../../common/referProduct'
import { setDB } from '../../common/services/CrudDb'
import { dbUpdateProductStyle, updateProductByStyle } from '../../common/UtilityFuncs'

export default function CreateOrder(orderid, orderNum, customer, orderSubtotal, orderTotal, shippingMethod, 
  paymentDetails, taxRate, billingDetails, shippingDetails, myUser, allProducts) {
  
    const user = firebase.auth().currentUser
    const updateID = db.collection('updates').doc().id

    const orderObj = {
      orderid,
      orderNumber: orderNum,
      products: myUser.cart,
      orderDateCreated: new Date(),
      customer,
      orderSubtotal: parseFloat(orderSubtotal.toFixed(2)),
      orderTotal,
      taxRate,
      paymentDetails,
      shippingMethod,
      billingDetails,
      shippingDetails: shippingDetails.length?shippingDetails:billingDetails, 
      updates: [{
        action: 'Order Received',
        date: new Date(),
        id: `upd-${updateID}`,
        location: 'N/A',
        status: 'Received'
      }],
      trackingNum: '',
      trackingReturn: ''
    }
    //create order on firebase
    db.collection('orders').doc(orderid).set(orderObj)
    .then(() => {
      console.log('Order has been placed successfully.')
      setDB('updates', updateID, {
        color: '#0088ff',
        date: new Date(),
        descript: `A new order has been created. View it here.`,
        icon: 'fal fa-shopping-bag',
        id: updateID,
        read: false,
        title: 'New Order Created',
        url: `/admin/orders/edit-order/${orderid}`
      })
      myUser.cart = []
      db.collection('users').doc(user.uid).update({
        userinfo: myUser //update user cart in their userInfo object
      })
      myUser.cart.forEach((el,i) => {
        updateProductByStyle(referProduct(allProducts, myUser.cart[i].id)?.sizes, myUser.cart[i]?.chosenSize, myUser.cart[i]?.chosenColor, myUser.cart[i]?.units)
      })
      const prodData = myUser.cart.map(el => el)
      const prodSizes = myUser.cart.map(el => referProduct(allProducts, el.id).sizes)
      dbUpdateProductStyle(prodData, prodSizes)
    }).catch(err => {
      console.log(err)
      window.alert('Order could not be created. Please try again later or use the customer support chat in your account page for help.')
    })
}
import firebase from 'firebase'
import {db} from '../../common/Fire'
import referProduct from '../../common/referProduct'
import { dbUpdateProductStyle, updateProductByStyle } from '../../common/UtilityFuncs'

export default function CreateOrder(orderid, orderNum, cart, customer, orderSubtotal, orderTotal, shippingMethod, 
  paymentDetails, taxRate, billingDetails, shippingDetails, myUser, allProducts) {
  
    const user = firebase.auth().currentUser

    const orderObj = {
      orderid,
      orderNumber: orderNum,
      products: cart,
      orderDateCreated: new Date(),
      customer,
      orderSubtotal: parseFloat(orderSubtotal.toFixed(2)),
      orderTotal,
      taxRate,
      paymentDetails,
      shippingMethod,
      billingDetails,
      shippingDetails: shippingDetails.length?shippingDetails:billingDetails, 
      updates: [],
      trackingNum: '',
      trackingReturn: ''
    }
    //create order on firebase
    db.collection('orders').doc(user.uid).set(
      orderObj, {merge:true}
    ).then(res => {
      console.log('Order has been placed successfully.')
      cart.splice(0,cart.length)
      db.collection('users').doc(user.uid).update({
        userinfo: myUser //update user cart in their userInfo object
      })
      cart.forEach((el,i) => {
        updateProductByStyle(referProduct(allProducts, cart[i].id)?.sizes, cart[i]?.chosenSize, cart[i]?.chosenColor, cart[i]?.units)
      })
      const prodData = cart.map(el => el)
      const prodSizes = cart.map(el => referProduct(allProducts, el.id).sizes)
      dbUpdateProductStyle(prodData, prodSizes)
    }).catch(err => {
      console.log(err)
      window.alert('Order could not be created. Please try again later or use the customer support chat in your account page for help.')
    })
}
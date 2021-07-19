import firebase from 'firebase'
import {db} from '../../common/Fire'

export default function CreateOrder(orderid, orderNum, cart, customer, orderSubtotal, orderTotal, shippingMethod, 
  paymentDetails, taxRate, billingDetails, shippingDetails, myUser) {
  
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
      console.log('Order has been placed')
      cart.splice(0,cart.length)
      db.collection('users').doc(user.uid).update({
        userinfo: myUser //update user cart in their userInfo object
      })
    }).catch(err => {
      console.log(err)
      window.alert('Order could not be created. Please try again later or contact the site admin for help.')
    })
}
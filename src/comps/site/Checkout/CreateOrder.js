import firebase from 'firebase'
import {db} from '../../common/Fire'

export default function CreateOrder(orderid, products, customer, orderSubtotal, orderTotal, shippingMethod, 
  paymentMethod, taxAmount, billingDetails, shippingDetails, myUser) {
  
    const user = firebase.auth().currentUser

    const orderObj = {
      orderid,
      products,
      orderDateCreated: new Date(),
      customer,
      orderSubtotal: orderSubtotal.toFixed(2),
      orderTotal: orderTotal.toFixed(2),
      taxAmount,
      paymentMethod,
      shippingMethod,
      billingDetails,
      shippingDetails: billingDetails, //temporary - remove when implemented
      orderStatus: 'open'
    }
    //create order on firebase
    db.collection('orders').doc(user.uid).set({
      allorders: firebase.firestore.FieldValue.arrayUnion(orderObj)
    },{merge:true}).then(res => {
      console.log('Order has been placed')
      //clear cart of user from firebase
      myUser.cart.splice(0,myUser.cart.length)
      db.collection('users').doc(user.uid).update({
        userinfo: myUser
      })
    }).catch(err => console.log(err))
}
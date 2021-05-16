import React, { useContext, useEffect } from 'react'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import {StoreContext} from '../../common/StoreContext'

export default function MyAccount() {

  const {user} = useContext(StoreContext)
  const history = useHistory()

  useEffect(() => {
    if(user === null) {
      history.push('/')
    }  
  },[]) 

  return (
    <div className="myaccountpage">
      <div className="grid xgrid">
        <h5 onClick={() => {firebase.auth().signOut();window.location.reload()}} style={{cursor:'pointer'}}>
          Log Out <i className="fal fa-sign-out"></i>
        </h5>
      </div>
    </div>
  )
}
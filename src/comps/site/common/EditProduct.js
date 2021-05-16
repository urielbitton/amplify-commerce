import React from 'react'

export default function EditProduct(props) {

  const {title="Edit Item"} = props

  function editProduct() {
    console.log('Product editing popup')
  }

  return (
    <h6 onClick={() => editProduct()}>{title}</h6>
  )
}
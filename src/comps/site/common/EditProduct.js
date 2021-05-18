import React, { useContext } from 'react'
import referProduct from '../../common/referProduct'
import { StoreContext } from '../../common/StoreContext'

export default function EditProduct(props) {

  const {title="Edit Item", product} = props
  const {setShowEditProd, setEditProduct, allProducts} = useContext(StoreContext)
  const {id, subid, units, chosenSize, chosenColor} = product
  const {name, imgs, sizes} = referProduct(allProducts, id)

  function editProduct() {
    setShowEditProd(true)
    setEditProduct({
      id,
      name,
      img: imgs[0],
      chosenSize,
      chosenColor,
      units,
      sizes,
      subid
    })
  }

  return (
    <h6 onClick={() => editProduct()}>{title}</h6>
  )
}
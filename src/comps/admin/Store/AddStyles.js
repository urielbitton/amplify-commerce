import React, { useContext, useEffect, useState } from 'react'
import AdminBtn from '../common/AdminBtn'
import {colorsOpts, sizeOpts} from './arrays/arrays'
import {colorConverter, sizeConverter} from '../../common/UtilityFuncs'
import {AppInput, AppSelect} from '../../common/AppInputs'
import AppAccordion from '../../site/common/AppAccordion'
import './styles/AddStyles.css'
import { db } from '../../common/Fire'

export default function AddStyles(props) {

  const {prodSizes, setProdSizes, sizes} = props
  const [newSize, setNewSize] = useState('')
  const [newColorName, setNewColorName] = useState('')
  const [newColorStock, setNewColorStock] = useState(0) 
  const [showNewSize, setShowNewSize] = useState(false)
  const [showColorRow, setShowColorRow] = useState(false)
  //const [sizesArr, setSizesArr] = useState([])
  const [colorsArr, setColorsArr] = useState([])

  const colorsrows = colorsArr?.map(el => {
    return <div className={`colorsrow ${showColorRow?"show":""}`}>
      <div className="inprow">
        <AppSelect title="Color" options={colorsOpts} value={el.name} namebased />
      </div>
      <div className="inprow">
        <AppInput title="Stock" value={el.stock}/>
      </div>
    </div>
  })
  const sizesrows = prodSizes?.map(el => {
    return <AppAccordion title={sizeConverter(el.name)}>
      
    </AppAccordion>
  })
  const prevsizesrows = sizes?.map(el => {
    return <AppAccordion title={sizeConverter(el.name)}>
      
    </AppAccordion>
  })

  function addColor() {
    if(newSize && newColorName && newColorStock) {
      setColorsArr(prev => [...prev, {name:newColorName,stock:+newColorStock, qtySold:0}])
      setNewColorName('')
      setNewColorStock(0)
    }
  }
  function addStyle() { 
    if(colorsArr.length) {
      setProdSizes(prev => [...prev, {colors:colorsArr, name:newSize}])
      setColorsArr([])
      setNewSize('')
      setShowColorRow(false)
    }
  }

  useEffect(() => {
    if(newSize.length) {
      setShowColorRow(true)
    }
    else {
      setShowColorRow(false)
      setNewSize('')
      setNewColorName('')
      setNewColorStock('')
      setColorsArr([])
    }
  },[newSize])

  return (
    <>
      <div className="stylescontent">
        {sizesrows}
        {sizes.length&&prevsizesrows}
        <div className={`newstylecont ${showNewSize?"show":""}`}>
        <div className="inprow">
          <AppSelect 
            title="Product Size" 
            options={sizeOpts} 
            onChange={(e) => setNewSize(e.target.value)}
            value={newSize}
            namebased
          />
        </div>
        {colorsrows}
        <div className={`colorsrow ${showColorRow?"show":""}`}> 
          <div className="inprow">
            <AppSelect 
              title="Color" 
              options={colorsOpts} 
              onChange={(e) => setNewColorName(e.target.value)}
              value={newColorName}
              namebased
            />
          </div>
          <div className="inprow">
            <AppInput 
              title="Stock" 
              onChange={(e) => setNewColorStock(e.target.value)}
              value={Math.abs(newColorStock)}
              type="number"
              min={0}
            />
          </div>
        </div>
        <div className={`addcoloractions ${showColorRow?"show":""}`}>
          <AdminBtn title="Add Color" solid nourl disabled={!newColorName||!newColorStock} onClick={() => addColor()}/>
          <AdminBtn title="Cancel" nourl onClick={() => setNewSize('')}/>
        </div>
        <div className={`addcoloractions ${showColorRow?"show":""} forsize`}>
          <AdminBtn title="Add Style" solid nourl disabled={!colorsArr.length} onClick={() => addStyle()}/>
          <AdminBtn title="Cancel" nourl onClick={() => setNewSize('')}/>
        </div>
        </div>
      </div>
      <div className="stylesactions">
        <AdminBtn 
          title={showNewSize?"Cancel":"New Style"} 
          nourl 
          onClick={() => {setShowNewSize(prev => !prev);setNewSize(prev => !prev)}}
        />
      </div>
    </>
  )
}
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
  const [colorsArr, setColorsArr] = useState([])
  const [savedSizes, setSavedSizes] = useState([])
  const [savedColors, setSavedColors] = useState([])
  const [showExtraAdd, setShowExtraAdd] = useState(false)

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

  const allsizesrows = prodSizes?.map(el => {
    return <AppAccordion 
      title={sizeConverter(el.name)} 
      subtitle={<i className="fal fa-trash-alt deleteicon" onClick={(e) => deleteStyle(el,e)}></i>}
      className="sizesrow"
    >
      {
        el.colors.map(x => {
          return <div className="inprow nested">
            <AppSelect title="Color" options={colorsOpts} value={x.name} namebased/>
            <AppInput title="Stock" value={x.stock}/>
          </div>
        })
      }
      { showExtraAdd&&
        <div className="inprow nested extraadds"> 
          <AppSelect title="Color" options={colorsOpts.filter(x => !el.colors.find(y => y.name === x.value))} onChange={(e) => setNewColorName(e.target.value)} value={newColorName} namebased/>
          <AppInput title="Stock" value={newColorStock} onChange={(e) => setNewColorStock(e.target.value)}/>
        </div> 
      }
      <div className="addcoloractions show" style={{padding:0}}>
        <AdminBtn title="Save" solid disabled={!newColorName || !newColorStock} nourl onClick={() => saveExtraColor(el)}/>
        <AdminBtn title={showExtraAdd?"Done":"Add"} solid={!showExtraAdd} nourl onClick={() => setShowExtraAdd(prev => !prev)}/>
      </div>
    </AppAccordion>
  })

  function addColor() {
    if(newSize && newColorName && newColorStock) {
      setColorsArr(prev => [...prev, {name:newColorName,stock:+newColorStock, qtySold:0}])
      setSavedColors(prev => [...prev, newColorName])
      setNewColorName('')
      setNewColorStock(0)
    }
  }
  function saveExtraColor(size) {
    const itemindex = prodSizes.indexOf(size)
    console.log(itemindex)
  }
  function addStyle() { 
    if(colorsArr.length) {
      setProdSizes(prev => [...prev, {colors:colorsArr, name:newSize}])
      setSavedSizes(prev => [...prev, newSize])
      setColorsArr([])
      setNewSize('')
      setShowColorRow(false)
      setSavedColors([])
      setShowNewSize(false)
    }
  }
  function deleteStyle(el, e) {
    e.stopPropagation()
    let itemindex = prodSizes.findIndex(x => x.name===el.name)
    const savedindex = savedSizes.findIndex(x => x===el.name)
    const confirm = window.confirm('Are you sure you want to delete this style?')
    if(confirm) {
      savedSizes.splice(savedindex,1)
      prodSizes.splice(itemindex,1)
      setProdSizes(prev => [...prev])
      setSavedSizes(prev => [...prev]) 
    } 
  }
  function newStyleActions() {
    setShowNewSize(prev => !prev)
    setNewSize(prev => !prev)
    setShowExtraAdd(false)
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

  useEffect(() => {
    if(sizes) {
      sizes.forEach(el => {
        setSavedSizes(prev => [...prev, el.name])
      })
    }
  },[sizes])

  useEffect(() => {
    sizes&&setProdSizes(sizes.flat(2))
  },[])

  useEffect(() => {
    setShowNewSize(false)
    setNewColorName('')
    setNewColorStock('')
  },[showExtraAdd])

  return (
    <>
      <div className="stylescontent">
        {allsizesrows}
        <div className={`newstylecont ${showNewSize?"show":"hide"}`}>
        <div className="inprow">
          <AppSelect 
            title="Product Size" 
            options={sizeOpts.filter(x => !savedSizes.includes(x.value))} 
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
              options={colorsOpts.filter(x => !savedColors.includes(x.value))} 
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
          onClick={() => newStyleActions()}
        />
      </div>
    </>
  )
}
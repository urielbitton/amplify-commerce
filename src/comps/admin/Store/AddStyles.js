import React, { useContext, useEffect, useState } from 'react'
import AdminBtn from '../common/AdminBtn'
import {sizeConverter} from '../../common/UtilityFuncs'
import {AppInput, AppSelect} from '../../common/AppInputs'
import AppAccordion from '../../site/common/AppAccordion'
import './styles/AddStyles.css'
import {StoreContext} from '../../common/StoreContext'

export default function AddStyles(props) {

  const {colorsOpts, sizesOpts, editProdMode} = useContext(StoreContext)
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
  const [extraEdit, setExtraEdit] = useState(-1)
  const [colorIndex, setColorIndex] = useState(-1)
  const [addMode, setAddMode] = useState(false)

  const colorsrows = colorsArr?.map(el => {
    return <div className={`colorsrow ${showColorRow?"show":""}`}>
      <div className="inprow">
        <AppSelect title="Color" options={[{name:'Choose a color',value:''},...colorsOpts]} value={el.name} namebased />
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
        el.colors.map((el2,i) => {
          return <div className={`inprow nested ${extraEdit===i?"active":""}`} onClick={(e) => extraEditActions(el.colors, el2, e, i)}>
            <AppSelect title="Color" options={[{name:'Choose a color',value:''},...colorsOpts]} value={extraEdit===i?newColorName:el2.name} onChange={(e) => setNewColorName(e.target.value)} namebased/>
            <AppInput title="Stock" value={extraEdit===i?newColorStock:el2.stock} onChange={(e) => setNewColorStock(e.target.value)}/>
            <AdminBtn title={<i className="far fa-trash-alt"></i>} className="deletebtn" clickEvent onClick={(e) => deleteColor(el.colors, el, el2, e)}/>
          </div>
        })
      }
      { showExtraAdd&&
        <div className="inprow nested extraadds"> 
          <AppSelect title="Color" options={[{name:'Choose a Color',value:''},...colorsOpts.filter(x => !el.colors.find(y => y.name === x.value))]} onChange={(e) => setNewColorName(e.target.value)} value={newColorName} namebased/>
          <AppInput title="Stock" value={newColorStock} onChange={(e) => setNewColorStock(e.target.value)}/>
        </div> 
      }
      <div className="addcoloractions show" style={{padding:0}} onClick={(e) => e.stopPropagation()}>
        <AdminBtn title={addMode?"Add":"Save"} solid disabled={!newColorName || !newColorStock} clickEvent onClick={() => addMode?addExtraColor(el):saveExtraColor(el)}/>
        <AdminBtn title={showExtraAdd?"Done":"New Color"} disabled={extraEdit>-1} solid={!showExtraAdd} clickEvent onClick={() => {setShowExtraAdd(prev => !prev);!showExtraAdd&&setAddMode(true)}}/>
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
  function extraEditActions(colorsarr, el2, e, i) {
    e.stopPropagation()
    setExtraEdit(i)
    setColorIndex(colorsarr.indexOf(el2))
    setAddMode(false)
    setShowExtraAdd(false)
  }
  function saveExtraColor(size) {
    const sizeindex = prodSizes.indexOf(size)
    prodSizes[sizeindex].colors[colorIndex] = {name: newColorName, stock: +newColorStock, qtySold: 0}
    setProdSizes(prev => [...prev])
    setExtraEdit(-1)
    setNewColorName('')
    setNewColorStock('')
  }
  function addExtraColor(size) {
    const sizeindex = prodSizes.indexOf(size)
    prodSizes[sizeindex].colors.push({name:newColorName,stock:newColorStock,qtySold:0})
    setProdSizes(prev => [...prev])
    setNewColorName('')
    setNewColorStock('')
  }
  function addStyle() { 
    if(colorsArr.length) {
      setProdSizes(prev => [...prev, {colors:[...new Set(colorsArr)], name:newSize}]) //new Set removes possible duplicates
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
  function deleteColor(colorsarr, el, el2, e) {
    e.stopPropagation()
    let sizeindex = prodSizes.indexOf(el)
    let colorsindex = colorsarr.indexOf(el2)
    prodSizes[sizeindex].colors.splice(colorsindex,1)
    setExtraEdit(-0.5)
  }
  function newStyleActions() {
    setShowNewSize(prev => !prev)
    setNewSize(prev => !prev)
    setShowExtraAdd(false)
  }

  useEffect(() => {
    window.onclick = () => {
      extraEdit>-1&&setExtraEdit(-1)
    }
  },[extraEdit])

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

  useEffect(() => {
    if(!editProdMode) {
      setSavedSizes([])
      setSavedColors([])
    }
  },[editProdMode])

  return (
    <>
      <div className="stylescontent">
        {allsizesrows}
        <div className={`newstylecont ${showNewSize?"show":"hide"}`}>
        <div className="inprow">
          <AppSelect 
            title="Product Size" 
            options={[{name:'Choose a Size',value:''},...sizesOpts?.filter(x => !savedSizes.includes(x.value))]}  
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
              options={[{name:"Choose a Color",value:''},...colorsOpts?.filter(x => !savedColors.includes(x.value))]} 
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
          <AdminBtn title="Add Color" solid clickEvent disabled={!newColorName||!newColorStock} onClick={() => addColor()}/>
          <AdminBtn title="Cancel" clickEvent onClick={() => setNewSize('')}/>
        </div>
        <div className={`addcoloractions ${showColorRow?"show":""} forsize`}>
          <AdminBtn title="Add Style" solid clickEvent disabled={!colorsArr.length} onClick={() => addStyle()}/>
          <AdminBtn title="Cancel" clickEvent onClick={() => setNewSize('')}/>
        </div>
        </div>
      </div>
      <div className="stylesactions">
        <AdminBtn 
          title={showNewSize?"Cancel":"New Style"} 
          clickEvent 
          onClick={() => newStyleActions()}
        />
      </div>
    </>
  )
}
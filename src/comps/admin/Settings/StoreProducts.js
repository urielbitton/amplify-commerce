import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import {AppInput, AppSwitch} from '../../common/AppInputs'
import AdminBtn from '../common/AdminBtn'
import { db } from '../../common/Fire'
import firebase from 'firebase'
import {setDB} from '../../common/services/CrudDb'

export default function StoreProducts() {

  const {storeSettings, sizesOpts:sizeOpts, colorsOpts:colorOpts, setNotifs} = useContext(StoreContext)
  const [showSizeAdder, setShowSizeAdder] = useState(false)
  const [showColorAdder, setShowColorAdder] = useState(false)
  const [sizeName, setSizeName] = useState('')
  const [sizeShort, setSizeShort] = useState('')
  const [colorName, setColorName] = useState('')
  const [colorHex, setColorHex] = useState('#0088ff')
  const [sizeId, setSizeId] = useState('')
  const [colorId, setColorId] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [enableReviews, setEnableReviews] = useState(true)
  const [enableRatings, setEnableRatings] = useState(true)
  const [reqRating, setReqRating] = useState(true)
  const [verifiedReviews, setVerifiedReviews] = useState(false)
  const sizeAccess = sizeName.length && sizeShort.length
  const colorAccess = colorName.length && colorHex.length
  const genSizeId = db.collection('admin').doc().id
  const genColorId = db.collection('admin').doc().id
  const updateID = db.collection('updates').doc().id
  
  const sizeObj = {
    id: genSizeId,
    name: sizeName,
    value: sizeShort.toUpperCase()
  }
  const colorObj = {
    id: genColorId,
    name: colorName,
    value: colorHex.toLowerCase()
  }

  const sizesRows = sizeOpts?.map(el => {
    return <div className="stylebox sizes" onClick={() => editSizeBox(el)}>
      <h5>{el.name}</h5>
      <small>{el.value}</small>
    </div>
  })
  const colorRows = colorOpts?.map(el => {
    return <div className="stylebox" onClick={() => editColorBox(el)}>
      <h5>{el.name}</h5>
      <small>{el.value}</small>
      <div className="circle" style={{background:el.value}}></div> 
    </div>
  })

  function createStyle(array, newObj, title, setState) {
    if(!editMode) {
      db.collection('admin').doc('storeSettings').update({
        [array]: firebase.firestore.FieldValue.arrayUnion(newObj)
      }).then(() => {
        setState(false)
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: `${title} Created`,
          icon: 'fal fa-plus',
          text: `New ${title} has been successfully added to your store.`,
          time: 5000
        }])
        setDB('updates', updateID, {
          color: '#0088ff',
          date: new Date(),
          descript: `A new product ${title} has been created. You can view it here.`,
          icon: 'fal fa-store',
          id: updateID,
          read: false,
          title: `Product ${title} Created`,
          url: `/admin/settings/store?products`
        })
      })
    }
    else {
      if(title === 'size') {
        let itemindex = sizeOpts.findIndex(x => x.id === sizeId)
        sizeOpts[itemindex].name = sizeName
        sizeOpts[itemindex].value = sizeShort
        db.collection('admin').doc('storeSettings').update({
          sizeOpts
        }).then(() => {
          setShowSizeAdder(false)
          setNotifs(prev => [...prev, {
            id: Date.now(),
            title: `${title} Saved`,
            icon: 'fal fa-save',
            text: `The ${title} has been successfully saved.`,
            time: 5000
          }])
        })
      }
      else {
        let itemindex = colorOpts.findIndex(x => x.id === colorId)
        colorOpts[itemindex].name = colorName
        colorOpts[itemindex].value = colorHex
        db.collection('admin').doc('storeSettings').update({
          colorOpts
        }).then(() => {
          setShowColorAdder(false)
          setNotifs(prev => [...prev, {
            id: Date.now(),
            title: `${title} Saved`,
            icon: 'fal fa-save',
            text: `The ${title.toLowerCase()} has been successfully saved.`,
            time: 5000
          }])
        })
      }
    }
  }

  function editSizeBox(el) {
    setEditMode(true)
    setShowSizeAdder(true)
    setSizeName(el.name)
    setSizeShort(el.value)
    setSizeId(el.id)
  }
  function editColorBox(el) {
    setEditMode(true)
    setShowColorAdder(true)
    setColorName(el.name)
    setColorHex(el.value)
    setColorId(el.id)
  }
  function deleteStyle(title, array, value) {
    const confirm = window.confirm(`Are you sure you want to delete this ${title}`)
    if(confirm) {
      let itemindex = array.findIndex(x => x.value === value)
      array.splice(itemindex, 1)
      db.collection('admin').doc('storeSettings').update(
        title==='size'?{sizeOpts}:{colorOpts}
        ).then(() => {
        setShowSizeAdder(false)
        setShowColorAdder(false)
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: `${title} Deleted`,
          icon: 'fal fa-trash-alt',
          text: `The ${title} has been successfully deleted from your store.`,
          time: 5000
        }])
      })
    }
  }
  function saveSettings() {
    
  }

  useEffect(() => {
    setEnableReviews(storeSettings.reviews.enableReviews)
    setEnableRatings(storeSettings.reviews.enableRatings)
    setReqRating(storeSettings.reviews.requireRatings)
    setVerifiedReviews(storeSettings.reviews.verifiedReviews)
  },[storeSettings])

  useEffect(() => {
    if(!editMode) {
      setSizeName('')
      setSizeShort('')
      setSizeId('')
    }
  },[showSizeAdder]) 
  
  useEffect(() => {
    if(!editMode) {
      setColorName('')
      setColorHex('#0088ff')
      setColorId('')
    }
  },[showColorAdder])
  
  return (
    <>
      <section>
        <h4 className="settingstitle">Product Sizes</h4>
        <div className="styleboxcont">
          {sizesRows}
          <div className="stylebox addbox" onClick={() => {setEditMode(false);setShowSizeAdder(true)}}>
            <h5>Add New</h5>
            <small><i className="fal fa-plus"></i></small>
          </div>
        </div>
        <small className="styleboxdescript">
          Create sizes options in order to add them to your products when you add new product styles.<br/>
          Click on a size box to edit it.
        </small>
      </section>
      <section>
        <h4 className="settingstitle">Product Colors</h4>
        <div className="styleboxcont">
          {colorRows}
          <div className="stylebox addbox" onClick={() => {setEditMode(false);setShowColorAdder(true)}}>
            <h5>Add New</h5>
            <small><i className="fal fa-plus"></i></small>
          </div>
        </div>  
        <small className="styleboxdescript">
          Create colors options in order to add them to your products when you add new product sizes.<br/>
          Click on a color box to edit it.
        </small>
      </section>
      <section>
        <h4 className="settingstitle">Reviews & Ratings</h4>
        <AppSwitch title="Enable Product Reviews" onChange={(e) => setEnableReviews(e.target.checked)} checked={enableReviews} />
        <AppSwitch title="Enable Product Ratings" onChange={(e) => setEnableRatings(e.target.checked)} checked={enableRatings} />
        <AppSwitch title="Require star ratings" onChange={(e) => setReqRating(e.target.checked)} checked={reqRating} />
        <AppSwitch title="Reviews can only be left from verified purchasers" onChange={(e) => setVerifiedReviews(e.target.checked)} checked={verifiedReviews} />
      </section>
      <div className="actionbtns">
        <AdminBtn title="Save" solid clickEvent onClick={() => saveSettings()}/>
      </div>

      <div className={`sizeaddercover styleaddercover ${showSizeAdder?"show":""}`} onClick={() => setShowSizeAdder(false)}>
        <div className="sizeaddercont" onClick={(e) => e.stopPropagation()}>
          <div className="styleaddercont">
            <h4>New Size</h4>
            <AppInput title="Size Name" placeholder="i.e. 'Extra Small'" className="inprow" onChange={(e) => setSizeName(e.target.value)} value={sizeName} />
            <AppInput title="Size Shorthand" placeholder="i.e. 'XS'" className="inprow" onChange={(e) => setSizeShort(e.target.value)} value={sizeShort}/>
            <div className="actions">
              <AdminBtn title={!editMode?"Create":"Save"} disabled={!!!sizeAccess} solid clickEvent onClick={() => createStyle('sizeOpts', sizeObj, 'size', setShowSizeAdder)} />
              <AdminBtn title="Cancel" clickEvent onClick={() => setShowSizeAdder(false)}/>
              {editMode&&<AdminBtn title="Delete" solid className="deletebtn" clickEvent onClick={() => deleteStyle('size', sizeOpts, sizeShort)}/>}
            </div>
          </div>
        </div>
      </div>

      <div className={`coloraddercover styleaddercover ${showColorAdder?"show":""}`} onClick={() => setShowColorAdder(false)}>
        <div className="sizeaddercont" onClick={(e) => e.stopPropagation()}>
          <div className="styleaddercont">
            <h4>New Color</h4>
            <AppInput title="Color Name" className="inprow" onChange={(e) => setColorName(e.target.value)} value={colorName} />
            <label className="appinput inprow appcolorinp">
              <h6>Choose Color</h6>
              <div>
                <input type="color" onChange={(e) => setColorHex(e.target.value)} value={colorHex} />
                <input type="text" onChange={(e) => setColorHex(e.target.value)} value={colorHex} className="colorinp"/>
              </div>
            </label>
            <div className="actions">
              <AdminBtn title={!editMode?"Create":"Save"} disabled={!!!colorAccess} solid clickEvent onClick={() => createStyle('colorOpts', colorObj, 'color', setShowColorAdder)}/>
              <AdminBtn title="Cancel" clickEvent onClick={() => setShowColorAdder(false)}/>
              {editMode&&<AdminBtn title="Delete" solid className="deletebtn" clickEvent onClick={() => deleteStyle('color', colorOpts, colorHex)}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
import React, { useContext, useEffect, useState } from 'react'
import AdminSlide from '../common/AdminSlide'
import './styles/CreateCampaign.css'
import {AppInput, AppSwitch, AppTextarea} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import { db } from '../../common/Fire'
import firebase from 'firebase'

export default function CreateCampaign() {
 
  const {allCustomers} = useContext(StoreContext)
  const [slidePos, setSlidePos] = useState(-1)
  const [limit, setLimit] = useState(10)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [duration, setDuration] = useState(7)
  const [selectAll, setSelectAll] = useState(false)
  const [addedCustomers, setAddedCustomers] = useState([])
  const [adTitle, setAdTitle] = useState('')
  const [adSubtitle, setAdSubtitle] = useState('')
  const [adImg, setAdImg] = useState('')
  const [adDescript, setAdDescript] = useState('')
  const [adUrl, setAdUrl] = useState('')
  const genCampId = db.collection('admin/marketing/campaigns').doc().id
  
  const campaignObj = {
    id: genCampId,
    name,
    description,
    duration,
    dateCreated: firebase.firestore.Timestamp,
    customers: addedCustomers,
    email: '',
    isActive,
    featuredProducts: [],
    ad: {}
  }

  const allCustomersRow = allCustomers?.slice(0,limit).map(el => {
    return <div className="row">
      <h6>{el.name}</h6>
      <h6>{el.email}</h6>
      <h6>
        <AdminBtn 
          title={addedCustomers.includes(el.email)?<i className="fal fa-check"></i>:<i className="fal fa-plus"></i>} 
          clickEvent 
          onClick={() => toggleCustomer(el.email)} 
          solid
        />
      </h6>
    </div>
  })

  const page1 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Campaign Info</h4>
    <AppInput title="Campaign Name" onChange={(e) => setName(e.target.value)} value={name}/>
    <AppTextarea title="Campaign Description" onChange={(e) => setDescription(e.target.value)} value={description}/>
    <AppInput title="Campaign Duration" type="number" onChange={(e) => setDuration(e.target.value)} value={duration<1?1:duration} min={0}/>
    <AppSwitch title="Activate Now" onChange={(e) => setIsActive(e.target.checked)} checked={isActive}/>
  </div>

  const page2 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Add Customers</h4>
    <div className="customerinvitecont">
      <label className="appcheckbox">
        <h6>Add All Customers</h6>
        <AdminBtn 
          title={
            addedCustomers.length===allCustomers.filter(x => x.isActive).length?
            <i className="fal fa-check"></i>:<i className="fal fa-plus"></i>
          }
          solid
          clickEvent
          onClick={() => setAddedCustomers(allCustomers.map(el => el.email))} 
        />
      </label>
      <div className="customerstable">
        <div className="header">
          <div className="row">
            <h6>Customer Name</h6>
            <h6>Customer Email</h6>
            <h6>Select</h6>
          </div>
        </div>
        <div className="content">
          {allCustomersRow}
        </div>
      </div>
    </div>
    <AdminBtn title="Load More" disabled={limit>=allCustomers.length} solid clickEvent onClick={() => setLimit(prev => prev+10)}/>
  </div>

  const page3 = <div className="slidepage adspage">
    <div className="left">
      <h4><i className="fas fa-th"></i>Advertisement</h4>
      <AppInput title="Ad Title" onChange={(e) => setAdTitle(e.target.value)} value={adTitle} />
      <AppInput title="Ad Subtitle" onChange={(e) => setAdSubtitle(e.target.value)} value={adSubtitle}/>
      <AppTextarea title="Ad Description" onChange={(e) => setAdDescript(e.target.value)} value={adDescript}/>
      <AppInput title="Ad Image (Copy link here)" onChange={(e) => setAdImg(e.target.value)} value={adImg}/>
      <AppInput title="Ad Url" onChange={(e) => setAdUrl(e.target.value)} value={adUrl}/>
    </div>
    <div className="right">
      <h2>Ad Preview</h2>
      <div className="adpreviewcont" style={{opacity:adTitle.length?"1":"0.3",backgroundImage: `url(${adImg})`}}>
        <h1>{adTitle}</h1>
        <h4>{adSubtitle}</h4>
        <p>{adDescript}</p>
        <AdminBtn title="Learn More" solid/>
      </div>
    </div>
  </div>

  const page4 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Marketing Email</h4>
  </div>

  const page5 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Review & Create</h4>
  </div>

  const slidePages = [page1, page2, page3, page4, page5]

  function toggleCustomer(custEmail) {
    if(!addedCustomers.includes(custEmail))
      setAddedCustomers(prev => [...prev, custEmail])
    else {
      let itemindex = addedCustomers.findIndex(x => x===custEmail)
      addedCustomers.splice(itemindex, 1)
      setAddedCustomers(prev => [...prev])
    }
  }

  useEffect(() => {
    setSlidePos(0)
  },[])

  return (
    <div className="createcampaignpage">
      <div className="pagecont">
        <AdminSlide 
          slidePages={slidePages}
          slidePos={slidePos}
          setSlidePos={setSlidePos}
          slideTitle="Create a Campaign"
        />
      </div>
    </div>
  )
}
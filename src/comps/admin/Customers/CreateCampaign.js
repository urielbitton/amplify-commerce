import React, { useContext, useEffect, useState } from 'react'
import AdminSlide from '../common/AdminSlide'
import './styles/CreateCampaign.css'
import {AppInput, AppSwitch, AppTextarea} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'
import { db } from '../../common/Fire'
import CampaignCard from './CampaignCard' 
import { useHistory, useLocation } from 'react-router-dom'

export default function CreateCampaign(props) {
 
  const {editCampMode, setEditCampMode, allCustomers, setNotifs} = useContext(StoreContext)
  const {name, description, duration, ad, customers, email, id, dateCreated, isActive} = editCampMode&&props.el
  const [slidePos, setSlidePos] = useState(-1)
  const [limit, setLimit] = useState(10)
  const [campName, setCampName] = useState('')
  const [campDescript, setCampDescript] = useState('')
  const [campDuration, setCampDuration] = useState(7)
  const [isCampActive, setIsCampActive] = useState(true)
  const [addedCustomers, setAddedCustomers] = useState([])
  const [adTitle, setAdTitle] = useState('')
  const [adSubtitle, setAdSubtitle] = useState('')
  const [adImg, setAdImg] = useState('')
  const [adDescript, setAdDescript] = useState('')
  const [adUrl, setAdUrl] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const genCampId = db.collection('admin/marketing/campaigns').doc().id
  const allowAcces = campName.length && campDescript.length && campDuration>0 && addedCustomers.length
    && emailSubject.length && emailBody.length
  const history = useHistory()
  const location = useLocation()
  
  const campaignObj = {
    id: editCampMode?id:genCampId,
    name: campName,
    description: campDescript,
    duration: +campDuration,
    dateCreated: editCampMode?dateCreated:new Date(),
    customers: addedCustomers,
    email: {
      subject: emailSubject,
      body: emailBody.replaceAll('\n', '<br/>')
    },
    isActive: isCampActive,
    featuredProducts: [],
    ad: {
      title: adTitle,
      subtitle: adSubtitle,
      descript: adDescript,
      img: adImg,
      url: adUrl
    }
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
    <AppInput title="Campaign Name" onChange={(e) => setCampName(e.target.value)} value={campName}/>
    <AppTextarea title="Campaign Description" onChange={(e) => setCampDescript(e.target.value)} value={campDescript}/>
    <AppInput title="Campaign Duration" type="number" onChange={(e) => setCampDuration(e.target.value)} value={duration<1?1:campDuration} min={0}/>
    <AppSwitch title="Activate Now" onChange={(e) => setIsCampActive(e.target.checked)} checked={isCampActive}/>
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
      <AppInput title="Title" onChange={(e) => setAdTitle(e.target.value)} value={adTitle} />
      <AppInput title="Subtitle" onChange={(e) => setAdSubtitle(e.target.value)} value={adSubtitle}/>
      <AppTextarea title="Description" onChange={(e) => setAdDescript(e.target.value)} value={adDescript}/>
      <AppInput title="Image (Copy link here)" onChange={(e) => setAdImg(e.target.value)} value={adImg}/>
      <AppInput title="Url" onChange={(e) => setAdUrl(e.target.value)} value={adUrl}/>
    </div>
    <div className="right">
      <h2>Ad Preview</h2>
      <div className="adpreviewcont" style={{opacity:adTitle.length?"1":"0.3",backgroundImage: `url(${adImg})`}}>
        <h1>{adTitle}</h1>
        <h4>{adSubtitle}</h4>
        <p>{adDescript}</p>
        <AdminBtn title="Learn More" solid hideBtn={!adUrl.length}/>
      </div>
    </div>
  </div>

  const page4 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Marketing Email</h4>
    <div className="emailtemplate">
      <AppInput title="Email Subject" onChange={(e) => setEmailSubject(e.target.value)} value={emailSubject}/>
      <AppTextarea title="Email Body" onChange={(e) => setEmailBody(e.target.value)} value={emailBody}/>
      <small>*Tip: add %customer% in your email to use customer's names dynamically.</small>
    </div>
  </div>

  const page5 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Review & Submit</h4>
    <CampaignCard el={campaignObj} hideBtns/>
    <br/>
    <AdminBtn 
      title={editCampMode?"Edit Campaign":"Create Campaign"}
      solid clickEvent
      className={!!!allowAcces?"disabled":""}
      onClick={() => editCampMode?editACampaign():createACampaign()}
    />
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
  function createACampaign() {
    if(!!allowAcces) {
      db.collection(`admin/marketing/campaigns`).doc(genCampId).set(campaignObj)
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Campaign Created',
          icon: 'fal fa-plus',
          text: `Your campaign was successfully created`,
          time: 5000
        }])
        history.push('/admin/customers/marketing')
      })
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all fields denoted with a *`,
        time: 5000
      }])
    }
  }
  function editACampaign() {
    if(!!allowAcces) {
      db.collection(`admin/marketing/campaigns`).doc(id).update(campaignObj)
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Campaign Saved',
          icon: 'fal fa-save',
          text: `Your campaign edits were successfully saved`,
          time: 5000
        }])
        history.push(`/admin/customers/marketing/campaign/${id}`)
      })
    }
    else {
      setNotifs(prev => [...prev, {
        id: Date.now(),
        title: 'Warning',
        color: 'var(--orange)',
        icon: 'fal fa-exclamation',
        text: `Please fill in all required fields`,
        time: 5000
      }])
    }
  }
  function deleteACampaign() {
    const confirm = window.confirm('Are you sure you wish to delete this campaign?')
    if(confirm) {
      db.collection(`admin/marketing/campaigns`).doc(id).delete()
      .then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Campaign Deleted',
          icon: 'fal fa-trash-alt',
          text: `Your campaign was deleted successfully`,
          time: 5000
        }])
        history.push(`/admin/customers/marketing`)
      })
    }
  }

  useEffect(() => {
    if(location.pathname.includes('edit-campaign'))
      setEditCampMode(true)
    else 
      setEditCampMode(false)
    return () => setEditCampMode(false)
  },[location]) 

  useEffect(() => {
    setCampName(editCampMode?name:"")
    setCampDescript(editCampMode?description:"")
    setCampDuration(editCampMode?duration:"")
    setIsCampActive(editCampMode?isActive:"")
    setAddedCustomers(editCampMode?customers:[])
    setAdTitle(editCampMode?ad.title:'')
    setAdSubtitle(editCampMode?ad.subtitle:'')
    setAdImg(editCampMode?ad.img:'')
    setAdDescript(editCampMode?ad.descript:'')
    setAdUrl(editCampMode?ad.url:'')
    setEmailSubject(editCampMode?email.subject:'')
    setEmailBody(editCampMode?email.body:'')
  },[editCampMode])

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
        <div className="actionbtns">
          <AdminBtn title="Done" solid clickEvent onClick={() => history.push('/admin/customers/marketing')}/>
          <AdminBtn title="Delete" solid className="deletebtn" clickEvent onClick={() => deleteACampaign()}/>
        </div>
      </div>
    </div>
  )
}
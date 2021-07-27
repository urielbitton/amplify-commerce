import React, { useContext, useState } from 'react'
import AdminSlide from '../common/AdminSlide'
import './styles/CreateCampaign.css'
import {AppInput, AppSwitch} from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'

export default function CreateCampaign() {
 
  const {allCustomers} = useContext(StoreContext)
  const [slidePos, setSlidePos] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [duration, setDuration] = useState(7)
  const [selectAll, setSelectAll] = useState(true)
 
  const allCustomersRow = allCustomers?.map(el => {
    return <div className="row">
      <h6>{el.name}</h6>
      <h6>{el.email}</h6>
      <h6><input type="checkbox"/></h6>
    </div>
  })

  const page1 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Campaign Info</h4>
    <AppInput title="Campaign Name" onChange={(e) => setName(e.target.value)} value={name}/>
    <AppInput title="Campaign Description" onChange={(e) => setDescription(e.target.value)} value={description}/>
    <AppInput title="Campaign Duration" type="number" onChange={(e) => setDuration(e.target.value)} value={duration<1?1:duration} min={0}/>
    <AppSwitch title="Activate Now" onChange={(e) => setIsActive(e.target.checked)} checked={isActive}/>
  </div>

  const page2 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Invite Customers</h4>
    <div className="customerinvitecont">
      <label className="appcheckbox">
        <h6>Invite All</h6>
        <input type="checkbox" checked={selectAll} onChange={(e) => setSelectAll(e.target.checked)} />
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
  </div>

  const page3 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Advertisement</h4>
  </div>

  const page4 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Marketing Email</h4>
  </div>

  const page5 = <div className="slidepage">
    <h4><i className="fas fa-th"></i>Review & Create</h4>
  </div>

  const slidePages = [page1, page2, page3, page4, page5]

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
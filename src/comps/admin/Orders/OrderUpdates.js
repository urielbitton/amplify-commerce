import React, { useContext, useState } from 'react'
import { AppInput, AppSelect, AppTextarea } from '../../common/AppInputs'
import { db } from '../../common/Fire'
import { StoreContext } from '../../common/StoreContext'
import AdminBtn from '../common/AdminBtn'

export default function OrderUpdates(props) {

  const {editOrdMode} = useContext(StoreContext)
  const {statusOpts, ordUpdates, setOrdUpdates} = props
  const [showAdder, setShowAdder] = useState(false)
  const [status, setStatus] = useState('')
  const [date, setDate] = useState(new Date())
  const [location, setLocation] = useState('')
  const [action, setAction] = useState('')
  const allowAdd = status && date && location && action

  const ordUpdatesRow = ordUpdates?.map(el => {
    return <div className="orderupdaterow">
      <h4>{el.status}</h4>
      <div>
        <h6><span>Date:</span> {el.date.split('T')[0]}</h6>
        <h6><span>Time:</span> {el.date.split('T')[1]}</h6>
        <h6><span>Tracking Location:</span> {el.location}</h6>
      </div>
      <small><span>Event</span> {el.action}</small>
      <AdminBtn title={<i className="fal fa-trash-alt"></i>} className="iconbtn delete" solid clickEvent onClick={() => deleteUpdate(el)}/>
    </div>
  })
  
  function addAnUpdate() {
    if(allowAdd) {
      setOrdUpdates(prev => [...prev, {
        id: db.collection('orders').doc().id,
        status,
        date,
        location,
        action
      }])
      setStatus('')
      setDate('')
      setLocation('')
      setAction('')
    }
  }
  function deleteUpdate(el) {
    let confirm = window.confirm('Are you sure you want to delete this update?')
    if(confirm) {
      let itemindex = ordUpdates.findIndex(x => x.id === el.id)
      ordUpdates.splice(itemindex, 1)
    }
  }

  return (
    <div className="orderupdatescont">
      <div className={`updatesaddercont ${showAdder?"show":""}`}>
        <h5>Add An Update</h5>
        <AppSelect title="Order Status" options={[{name:'Choose a Status',value:''},...statusOpts]} onChange={(e) => setStatus(e.target.value)} value={status} namebased/>
        <div className={`inprow ${status?"show":""}`}>
          <AppInput title="Date" type="datetime-local" onChange={(e) => setDate(e.target.value)} value={date} />
          <AppInput title="Tracking Location" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="Package tracked location" />
          <AppTextarea title="Update Event" onChange={(e) => setAction(e.target.value)} value={action} placeholder="Enter a brief update message" />
          <div className="actionbtns">
            <AdminBtn title="Add" solid disabled={!allowAdd} clickEvent onClick={() => addAnUpdate()}/>
            <AdminBtn title="Cancel" clickEvent onClick={() => setShowAdder(false)}/>
          </div>
        </div>
      </div>
      <h4>Order Updates</h4>
      {ordUpdatesRow}
      <AdminBtn title={showAdder?"Hide":"Add Update"} solid={!showAdder} clickEvent onClick={() => setShowAdder(prev => !prev)}/>
    </div>
  )
}
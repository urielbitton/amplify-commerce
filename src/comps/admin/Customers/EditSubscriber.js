import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AppInput, AppSwitch } from '../../common/AppInputs'
import {StoreContext} from '../../common/StoreContext'
import { validateEmail } from '../../common/UtilityFuncs'
import AdminBtn from '../common/AdminBtn'
import PageTitle from '../common/PageTitle'
import {deleteDB, setDB, updateDB} from '../../common/services/CrudDb'
import { db } from '../../common/Fire'

export default function EditSubscriber(props) {

  const {editSubsMode, setEditSubsMode, setNotifs} = useContext(StoreContext)
  const {id, name, email, date, isActive} = editSubsMode&&props.el
  const [subName, setSubName] = useState('')
  const [subEmail, setSubEmail] = useState('')
  const [subActive, setSubActive] = useState('')
  const [subDate, setSubDate] = useState('')
  const location = useLocation()
  const pagetitle = editSubsMode?"Edit Subscriber":"Add Subscriber"
  const allowCreate = subName && validateEmail(subEmail)
  const genNewSubId = db.collection('subscribers').doc().id 
  const genSubId = editSubsMode? id : genNewSubId
  const updateID = db.collection('updates').doc().id
  const history = useHistory()

  const subObj = {
    id: genSubId,
    name: subName,
    email: subEmail,
    isActive: subActive,
    date: subDate
  }

  function createSubscriber() {
    if(!!allowCreate) {
      setDB('subscribers', genSubId, subObj).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Subscriber Added',
          icon: 'fal fa-plus',
          text: `The subscriber was successfully added to your subscribers list.`,
          time: 5000
        }])
        setDB('updates', updateID, {
          color: '#0088ff',
          date: new Date(),
          descript: `You have a new subscriber. View them here.`,
          icon: 'fal fa-envelope-open-text',
          id: updateID,
          read: false,
          title: 'New Subscriber',
          url: `/admin/customers/edit-subscriber/${genSubId}`
        })
        history.push('/admin/customers/subscribers')
      })
    }
  }
  function editSubscriber() {
    if(!!allowCreate) {
      updateDB('subscribers', id, subObj).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Subscriber Saved',
          icon: 'fal fa-save',
          text: `The subscriber was successfully saved to your subscribers list.`,
          time: 5000
        }])
        history.push('/admin/customers/subscribers')
      })
    }
  }
  function deleteSubscriber() {
    const confirm = window.confirm('Are you sure you want to delete this subscriber?')
    if(confirm) {
      deleteDB('subscribers', id).then(() => {
        setNotifs(prev => [...prev, {
          id: Date.now(),
          title: 'Subscriber Deleted',
          icon: 'fal fa-trash-alt',
          text: `The subscriber was successfully deleted from your subscribers list.`,
          time: 5000
        }])
        history.push('/admin/customers/subscribers')
      })
    }
  }

  useEffect(() => {
    if(location.pathname.includes('/edit-subscriber')) 
      setEditSubsMode(true)
    else
      setEditSubsMode(false)
    return () => setEditSubsMode(false) 
  },[location])

  useEffect(() => {
    setSubName(editSubsMode?name:'')
    setSubEmail(editSubsMode?email:'')
    setSubActive(editSubsMode?isActive:'')
    setSubDate(editSubsMode?date:new Date())
  },[editSubsMode])

  return (
    <div className="editsubscriberpage">
      <PageTitle title={pagetitle} />
      <div className="pagecont">
        <h3 className="pagetitle">{pagetitle}</h3>
        <div className="pagemaincontent">
          <AppInput title="Subscriber Name" onChange={(e) => setSubName(e.target.value)} value={subName}/>
          <AppInput title="Subscriber Email" onChange={(e) => setSubEmail(e.target.value)} value={subEmail}/>
          <AppSwitch className="inprow show" title="Active" onChange={(e) => setSubActive(e.target.checked)} checked={subActive}/>
          <div className="final actionbtns">
            <AdminBtn title={editSubsMode?"Save Subscriber":"Add Subscriber"} className={!!!allowCreate?"disabled":""} solid clickEvent onClick={() => !editSubsMode?createSubscriber():editSubscriber()}/>
            {editSubsMode&&<AdminBtn title="Delete Subscriber" solid className="deletebtn" clickEvent onClick={() => deleteSubscriber()}/>}
            <AdminBtn title="Cancel" url="/admin/customers/subscribers"/>
          </div>
        </div>
      </div>
    </div>
  )
}
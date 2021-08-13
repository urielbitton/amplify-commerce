import React, { useContext, useState } from 'react'
import {StoreContext} from '../../common/StoreContext'
import PageStarter from '../common/PageStarter'
import PageTitlesRow from '../common/PageTitlesRow'
import PageTitle from '../common/PageTitle'
import {subsHeaders} from './arrays/arrays'
import { Link, useHistory } from 'react-router-dom'
import { convertDate } from '../../common/UtilityFuncs'
import { deleteDB } from '../../common/services/CrudDb'

export default function Subscribers() {

  const {allSubscribers, setEditSubsMode, setNotifs} = useContext(StoreContext)
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(-1)
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allSubsFilter = allSubscribers?.filter(x => pattern.test(x.name) || pattern.test(x.email))
  const history = useHistory()

  const headersrow = subsHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  const allSubsRows = allSubsFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5><Link to={`/admin/customers/edit-subscriber/${el.id}`}>{el.name}</Link></h5>
      <h5><a className="hoverable" href={`mailto:${el.email}`}>{el.email}</a></h5>
      <h5>{convertDate(el.date.toDate())}</h5>
      <h5 className="status"><span>{el.isActive?"Active":"Not Active"}</span></h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div title="Edit Subscriber" onClick={() => editSub(el.id)}><i className="far fa-edit"></i></div>
          <div title="Delete Subscriber" onClick={() => deleteSub(el.id)}><i className="far fa-trash-alt"></i></div>
          <div title="Subscriber Info" onClick={() => infoSub(el.id)}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function editSub(subid) {
    setEditSubsMode(true)
    history.push(`/admin/customers/edit-subscriber/${subid}`)
  }
  function deleteSub(subid) {
    const confirm = window.confirm('Are you sure you want to delete this subscriber?')
    if(confirm) {
      deleteDB('subscribers', subid).then(() => {
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
  function infoSub() {

  }

  return (
    <div className="subscriberspage">
      <PageTitle title="Customers"/>
      <div className="pagecont">
        <PageTitlesRow 
          title="Subscribers"
          btnTitle="New Subscriber"
          btnUrl="/admin/customers/add-subscriber"
          searchPlaceholder="Find a Subscriber"
          setKeyword={setKeyword}
        />
        <PageStarter 
          subtitle="You have no subscribers yet."
          title="Add a Subscriber"
          img="https://i.imgur.com/KDqhRGi.png"
          btnText="Add Subscriber"
          btnUrl="/admin/customers/add-subscriber"
          hide={allSubscribers.length}
        />
        <div className="customerstablecont">
          <div className="producttable">
            <div className="header">
              {headersrow}
            </div>
            <div className="content">
              {allSubsRows}
            </div>
            <div className="foot">
              <h5><span>{allSubscribers.length}</span> Subscriber{allSubscribers.length>1?"s":""}</h5>
              <h5><span>{allSubscribers.reduce((a,b) => a + b.isActive,0)}</span> Active</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
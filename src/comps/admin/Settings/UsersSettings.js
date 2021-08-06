import React, { useContext, useState } from 'react'
import { StoreContext } from '../../common/StoreContext'
import PageTitlesRow from '../common/PageTitlesRow'
import './styles/UsersSettings.css'
import {usersHeaders} from './arrays/arrays'
import { Link } from 'react-router-dom'

export default function UsersSettings() {

  const {allUsers} = useContext(StoreContext)
  const [sort, setSort] = useState(0)
  const [asc, setAsc] = useState(true)
  const [showOpts, setShowOpts] = useState(-1)
  const [keyword, setKeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "")
  let pattern = new RegExp('\\b' + clean(keyword), 'i')
  const allUsersFilter = allUsers?.filter(x => (pattern.test(x.userid) || pattern.test(x.name) || 
  pattern.test(x.email) || pattern.test(x.city) || pattern.test(x.country)))

  const headersrow = usersHeaders?.map((el,i) => {
    return <h5 className={el.val===sort?"active":""}>
      <span onClick={() => {setSort(el.val);setAsc(el.val===sort && asc?false:true)}}>{el.name}</span>
      {i!==8&&<i className={sort===el.val && asc?"fad fa-sort-up":sort===el.val && !asc?"fad fa-sort-down":"fas fa-sort"}></i>}
    </h5>
  }) 

  const allUsersRow = allUsersFilter?.sort((a,b) => {
    return
  }).map((el,i) => {
    return <div className="proditem">
      <h5 title={`User ID: ${el.userid}`} className="custimg">
        <Link to={`/admin/customer/${el.userid}`}><img src={el.profimg} alt=""/></Link>
      </h5>
      <h5><Link to={`/admin/customer/${el.userid}`}>{el.fullname}</Link></h5>
      <h5><a className="hoverable" href={`mailto:${el.email}`}>{el.email}</a></h5>
      <h5>{el.phone.length?el.phone:"N/A"}</h5>
      <h5>{el.city.length?el.city:'N/A'}</h5>
      <h5>{el.country.length?el.country:'N/A'}</h5>
      <h5>
        <div className="actionsdiv" onClick={(e) => {setShowOpts(showOpts===i?0:i);e.stopPropagation()}}>
          <i className="far fa-ellipsis-h actionsicon"></i>
        </div>
        <div className={`optscont ${i===showOpts?"show":""}`}> 
          <div title="Edit User" onClick={() => editUser(el.userid)}><i className="far fa-edit"></i></div>
          <div title="Delete User" onClick={() => deleteUser(el.userid)}><i className="far fa-trash-alt"></i></div>
          <div title="User Info" onClick={() => infoUser(el.userid)}><i className="far fa-info"></i></div>
        </div>
      </h5>
    </div>
  })

  function editUser() {

  }
  function deleteUser() {

  }
  function infoUser() {

  }

  return (
    <div className="adminuserssettings">
      <div className="settingspage userssettingspage longidpage">
        <div className="pagecont">
          <PageTitlesRow 
            title={<><i className="far fa-user-friends"></i>User Settings</>}
            searchPlaceholder="Find a setting..."
            setKeyword={setKeyword}
          />
          <div className="customerstablecont longidpage">
            <div className="producttable">
              <div className="header">
                {headersrow}
              </div>
              <div className="content">
                {allUsersRow}
              </div>
              <div className="foot">
                <h5><span>{allUsersFilter.length}</span> Users{allUsersFilter.length>1?'s':''}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
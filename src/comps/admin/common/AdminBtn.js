import React from 'react'
import { Link } from 'react-router-dom'
import './styles/AdminBtn.css'

export default function AdminBtn(props) {
 
  const {title, icon, url, className, solid, clickEvent, onClick, disabled, hideBtn} = props

  return (
    <div className={`adminbtncont ${hideBtn?"hide":""}`}>
      <Link 
          to={!disabled&&url}  
          onClick={clickEvent?(e) => !disabled&&onClick(e):() => null} 
        >
          <div className={`adminbtn ${className} ${disabled?"disabled":""} ${solid?"solid":""}`}> 
            {icon&&<i className={`icon ${icon}`}></i>}
            <span>{title}</span>
        </div>
      </Link>
    </div>
  )
}
import React from 'react'
import { AppInput } from '../../common/AppInputs'
import AdminBtn from './AdminBtn'
import './styles/PageTitlesRow.css' 

export default function PageTitlesRow(props) {

  const {title, btnTitle, btnUrl, searchPlaceholder, setKeyword} = props

  return (
    <div className="titlesrow">
      <h4>{title}</h4>
      <div className="flex">
        {btnTitle&&<AdminBtn title={btnTitle} url={btnUrl}/>}
        <AppInput 
          placeholder={searchPlaceholder} 
          iconclass="fal fa-search" 
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  )
}
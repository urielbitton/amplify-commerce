import React from 'react'
import './styles/TabsBar.css'

export default function TabsBar(props) {

  const {tabsTitles, tabPos, setTabPos} = props

  const tabsheadrow = tabsTitles?.map((el,i) => {
    return <h5
      className={i===tabPos?"active":""}
      onClick={() => setTabPos(i)}
    >{el}<hr/></h5>
  })

  return (
    <div className="tabsbar">
      <div className="tabstitles"> 
        {tabsheadrow} 
      </div>
      <hr className="tabline"/>
    </div>
  )
}
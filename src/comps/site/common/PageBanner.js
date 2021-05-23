import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/PageBanner.css'

export default function PageBanner(props) {
  
  const {title} = props
  const location = useLocation()
  const crumbs = location.pathname?.split('/').slice(1)
 
  const crumbsrow = crumbs?.map((el,i) => {
    return <React.Fragment key={i}>
      <small className="slash">/</small>
      <Link ><small>{el.replaceAll('-',' ')}</small></Link>
    </React.Fragment>
  })

  useEffect(() => {
    document.title = `${title} - Amplify Commerce`
  },[])

  return (
    <div className="pagebanner">
      <div className="grid">
        <div className="crumbscont">
          <Link to="/"><small>Home</small></Link>
          {crumbsrow}
        </div>
        <div className="titlecont">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  )
}
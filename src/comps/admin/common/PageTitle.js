import React, { useEffect } from 'react'

export default function PageTitle(props) {

  const {title} = props

  useEffect(() => {
    document.title = `${title} - Amplify Commerce`
  },[])

  return (
    <></>
  )
}
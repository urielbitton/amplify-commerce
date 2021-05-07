import React from 'react'
import './styles/SectionTitles.css'

export default function SectionTitles(props) {

  const {title, text} = props

  return (
    <div className="sectiontitles">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}
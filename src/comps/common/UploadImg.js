import React from 'react'
import ImgUploader from './services/ImgUploader'
import './styles/UploadImg.css'

export default function UploadImg(props) {

  const {img, setImg, storagePath, maxSize=2097152, className} = props

  return (
    <div className={`imguploadcont ${className}`}>
      <label>
        <input style={{display:'none'}} type="file" onChange={(e) => ImgUploader(e, setImg, storagePath)}/>
        <img src={img.length?img:"https://i.imgur.com/1OKoctC.jpg"} alt=""/>
        <div className="iconcont">
          <i className="fas fa-camera"></i>
        </div>
      </label>
    </div>
  )
}
import React, {useState, useRef, useContext} from 'react'
import firebase from 'firebase'
import { StoreContext } from './StoreContext'
import { AppInput } from './AppInputs'
import {db} from './Fire'

export default function ImgUploader(props) {

  const {user} = useContext(StoreContext)
  const {urlState, setUrlState} = props
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef()
  var storageRef = firebase.storage().ref(`${user.uid}/images`).child('profilepic')

  function uploadImg(e) {
    const file = e.target.files[0]
    if(file) {
      const task = storageRef.put(file)
      task.on("stat_changes", 
        function progress(snap) {
          setLoading(true)
          const percent = (snap.bytesTransferred / snap.totalBytes) * 100
          //loadingRef.current.style.width = percent + '%'
        },
        function error() {
          window.alert('An error has occured. Please try again later.')
        },
        function complete() {
          setLoading(false)
          storageRef.getDownloadURL().then(url => {
            setUrlState(url)
          })
          window.alert('Image uploaded successfully.')
        }
      )
    }
    else if(file.size/1024/1024 > 3) {
      window.alert('Image is too large')
    }
  }

  return (
    <>
      <AppInput 
        type="file"
        onChange={(e) => uploadImg(e)}
      />
      <img src={urlState} alt=""/>
    </>
  )
}
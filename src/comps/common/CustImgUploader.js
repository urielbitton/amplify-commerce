import firebase from 'firebase'
import { db } from './Fire'

export default function CustImgUploader(e, userId, setLoading, loadingRef, setUrl, toUser) {

  const storageRef = firebase.storage().ref(`${userId}/images`).child('profilepic')

  const file = e.target.files[0]
  if(file) {
    const task = storageRef.put(file)
    task.on("stat_changes", 
      function progress(snap) {
        setLoading(true)
        const percent = (snap.bytesTransferred / snap.totalBytes) * 100
        loadingRef.current.style.width = percent + '%'
      },
      function error() {
        window.alert('An error has occured. Please try again later.')
      },
      function complete() {
        setLoading(false)
        storageRef.getDownloadURL().then(url => {
          setUrl(url)
          toUser&&
          db.collection('users').doc(userId).update({
            'userinfo.profimg': url
          })
          db.collection('customers').doc(userId).update({
            profimg: url
          })
        })
      }
    )
  }
}
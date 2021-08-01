import firebase from 'firebase'
import { db } from '../Fire'

export default function ImgUploader(e, setUrl, storagePath, userId, propKey) {

  const storageRef = firebase.storage().ref(storagePath)

  const file = e.target.files[0]
  if(file) {
    const task = storageRef.put(file)
    task.on("stat_changes", 
      function complete() {
        storageRef.getDownloadURL().then(url => {
          setUrl(url)
          db.collection('users').doc(userId).update({
            [propKey]: url
          })
        })
      },
      function error() {
        window.alert('An error has occured. Please try again later.')
      }
    )
  }
}
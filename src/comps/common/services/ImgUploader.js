import firebase from 'firebase'

export default function ImgUploader(e, setUrl, storagePath) {

  const file = e.target.files[0]
  if(file) {
    const storageRef = firebase.storage().ref(storagePath)
    const task = storageRef.put(file)
    task.on("stat_changes", 
      function complete() {
        storageRef.getDownloadURL().then(url => {
          setUrl(url)
        })
      },
      function error() {
        window.alert('File upload error. Please try again later.')
      }
    )
  }
}
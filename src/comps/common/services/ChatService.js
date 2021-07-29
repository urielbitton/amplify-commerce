import { db } from '../Fire'

export function getChatByUserId(path, setChatData) {
  db.collection(path).orderBy('messageDate','asc').onSnapshot(snap => {
    const chatsArr = []
    snap.forEach(doc => {
      chatsArr.push(doc.data())
    })
    setChatData(chatsArr)
  })
}

export function sendChat(path, chatObj) {
  db.collection(path).add(chatObj) 
}
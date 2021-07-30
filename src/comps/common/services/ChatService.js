import { db } from '../Fire'

export function getChatByUserId(path, setChatData, limit=10) {
  db.collection(path).orderBy('messageDate','desc').limit(limit).onSnapshot(snap => {
    const chatsArr = []
    snap.forEach(doc => {
      chatsArr.push(doc.data())
    })
    setChatData(chatsArr)
  })
}

export function sendChat(customerId, chatObj) {
  db.collection('chats').doc(customerId).collection('messages').add(chatObj) 
  db.collection('chats').doc(customerId).update({
    'chatInfo.dateModified': new Date()
  })
}

export function createAChat(customerId, message, adminId) {
  const chatInfo = {
    customerId,
    dateCreated: new Date(), 
    dateModified: new Date(),
    isArchived: false,
    isActive: true
  }
  db.collection('chats').doc(customerId).set({chatInfo})
  .then(() => {
    db.collection('chats').doc(customerId).collection('messages').doc().set({
      isActive: true,
      message,
      messageDate: new Date(),
      senderId: !adminId.length?customerId:adminId
    })
  })
}
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

export function createAChat(customerId) {
  const chatInfo = {
    customerId,
    dateCreated: new Date(), 
    isArchived: false,
    isActive: true
  }
  db.collection('chats').doc(customerId).set({chatInfo})
  .then(() => {
    db.collection('chats').doc(customerId).collection('messages').doc().set({
      isActive: true,
      message: 'Customer Support',
      messageDate: new Date(),
      senderId: customerId
    })
  })
}
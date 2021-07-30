import { db } from '../Fire'

export function getChatByUserId(customerId, setChatData, limit=10) {
  db.collection('chats').doc(customerId).collection('messages').orderBy('messageDate','desc').limit(limit)
    .onSnapshot(snap => {
      const chatsArr = []
      snap.forEach(doc => {
        chatsArr.push(doc.data())
      })
      setChatData(chatsArr)
  })
  db.collection('chats').doc(customerId).update({
    'chatInfo.read': true
  })
}

export function sendChat(customerId, chatObj) {
  db.collection('chats').doc(customerId).collection('messages').add(chatObj).then(() => {
    db.collection('chats').doc(customerId).update({
      'chatInfo.dateModified': new Date(),
      'chatInfo.lastMsg': chatObj.message,
      'chatInfo.read': false
    })
  }) 
}

export function createAChat(customerId, message, adminId) {
  const chatInfo = {
    customerId,
    dateCreated: new Date(), 
    dateModified: new Date(),
    lastMsg: message,
    isArchived: false,
    isActive: true,
    read: false
  }
  db.collection('chats').doc(customerId).set({chatInfo})
  .then(() => {
    db.collection('chats').doc(customerId).collection('messages').add({
      isActive: true,
      message,
      messageDate: new Date(),
      senderId: !adminId.length?customerId:adminId
    })
  })
}

export function getLastMessage(path, setLastMsg) {
  db.collection(path).orderBy('messageDate','asc').limitToLast().onSnapshot(snap => {
    snap.forEach(doc => {
      setLastMsg(doc.data())
    })
  })
}
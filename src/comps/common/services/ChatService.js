import { db } from '../Fire'

export function getChatByUserId(customerId, setChatData, limit=10) {
  db.collection('chats').doc(customerId).collection('messages').orderBy('messageDate','desc').limit(limit)
    .onSnapshot(snap => {
      const chatsArr = []
      snap.forEach(doc => chatsArr.push(doc.data()))
      setChatData(chatsArr)
  })
  db.collection('chats').doc(customerId).update({
    'chatInfo.read': true
  })
} 

export function sendChat(customerId, chatObj, lastSenderId) {
  db.collection('chats').doc(customerId).collection('messages').add(chatObj).then(() => {
    db.collection('chats').doc(customerId).update({
      'chatInfo.dateModified': new Date(),
      'chatInfo.lastMsg': chatObj.message,
      'chatInfo.read': false,
      'chatInfo.lastSenderId': lastSenderId
    })
  }) 
}

export function createAChat(customerId, message, adminId) {
  const chatInfo = {
    customerId,
    dateCreated: new Date(), 
    dateModified: new Date(),
    lastMsg: message,
    lastSenderId: adminId?.length?adminId??"admin":customerId,
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
      senderId: !adminId?.length?customerId:adminId??"admin"
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

export function archiveChat(customerId, action) {
  db.collection('chats').doc(customerId).update({
    'chatInfo.isArchived': action
  })
}

export function deactivateChat(customerId, action) {
  db.collection('chats').doc(customerId).update({
    'chatInfo.isActive': action
  })
}

export function markReadChat(customerId, action) {
  db.collection('chats').doc(customerId).update({
    'chatInfo.read': action
  })
}
import { db } from "../Fire";

export function getChatByUserId(path, setChatData) {
  db.collection(path).orderBy('messageDate','desc').onSnapshot(snap => {
    const chatsArr = []
    snap.forEach(doc => {
      chatsArr.push(doc.data())
    })
    setChatData(chatsArr)
  })
}
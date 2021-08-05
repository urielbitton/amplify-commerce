import {db} from '../Fire'

export function updateDB(col, doc, value) {
  return db.collection(col).doc(doc).update(value)
}

export function setDB(col, doc, value) {
  return db.collection(col).doc(doc).set(value)
}

export function deleteDB(col, doc) {
  return db.collection(col).doc(doc).delete()
}

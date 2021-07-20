export default function genRandomNum() {
  return `${new Date().getTime().toString().slice(0,-3)}${Math.floor(Math.random() * (999 - 100 + 1)) + 100}`
}
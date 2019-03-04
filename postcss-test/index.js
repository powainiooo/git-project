import './layout.css'
function show(str) {
  let el = document.createElement('div')
  el.innerHTML = `Hello,${str}`
  return el
}
document.body.appendChild(show('postcss'))
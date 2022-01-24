import jpeg from './images/file.jpeg'
import png from './images/file.png'
import svg from './images/file.svg'

const container = document.createElement('div')

Object.assign(container.style, {
  display: 'flex',
  justifyContent: 'center'
})
document.body.appendChild(container)

function createImageElement(title: string, src: string) {
  const div = document.createElement('div')
  div.style.textAlign = 'center'

  const h2 = document.createElement('h2')
  h2.textContent = title
  div.appendChild(h2)

  const img = document.createElement('img')
  img.setAttribute('src', src)
  img.setAttribute('width', '150')
  img.appendChild(img)

  container.appendChild(div)
}

;[png, jpeg, svg].forEach(src => {
  createImageElement(src.split('.').pop(), src)
})

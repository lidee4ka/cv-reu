import './style.css'

const nav = document.querySelector('.nav')
const toggle = document.querySelector('.nav-toggle')
const links = document.querySelectorAll('.nav a, .to-top')

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open')
  toggle.setAttribute('aria-expanded', String(open))
})

links.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open')
    toggle?.setAttribute('aria-expanded', 'false')
  })
})

const header = document.querySelector('.site-header')
const spyLinks = [...document.querySelectorAll('.nav a[href^="#"]')]
const spySections = spyLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean)

const updateActiveNav = () => {
  const offset = (header?.getBoundingClientRect().height || 72) + 10
  let activeId = ''
  for (const section of spySections) {
    if (section.getBoundingClientRect().top <= offset) activeId = section.id
  }
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
  if (atBottom) activeId = spySections.at(-1)?.id || activeId

  spyLinks.forEach((link) => {
    const on = Boolean(activeId) && link.hash === `#${activeId}`
    link.classList.toggle('is-active', on)
    if (on) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  })
}

const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12)
  document.querySelector('.to-top')?.classList.toggle('is-visible', window.scrollY > 360)
  updateActiveNav()
}
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', updateActiveNav)

document.querySelector('[data-print]')?.addEventListener('click', (event) => {
  event.preventDefault()
  window.print()
})

const lightbox = document.querySelector('#lightbox')
const lightboxImage = lightbox?.querySelector('img')
const lightboxTitle = lightbox?.querySelector('.lightbox-title')
const lightboxStage = lightbox?.querySelector('.lightbox-stage')
const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25
let zoom = 1
let baseWidth = 0
let lastTrigger = null

const fitBaseWidth = () => {
  if (!lightboxImage?.naturalWidth || !lightboxStage) return 320
  const available = Math.max(lightboxStage.clientWidth - 8, 160)
  return Math.min(lightboxImage.naturalWidth, available)
}

const applyZoom = () => {
  if (!lightboxImage) return
  lightboxImage.style.width = `${Math.round(baseWidth * zoom)}px`
}

const openLightbox = (trigger) => {
  if (!lightbox || !lightboxImage) return
  const src = trigger.getAttribute('data-lightbox')
  const preview = trigger.querySelector('img')
  lastTrigger = trigger
  zoom = 1
  lightboxImage.src = src
  lightboxImage.alt = preview?.alt || ''
  lightboxTitle.textContent = preview?.alt || 'Просмотр макета'
  const show = () => {
    baseWidth = fitBaseWidth()
    applyZoom()
    lightboxStage.scrollTop = 0
    lightboxStage.scrollLeft = 0
  }
  if (lightboxImage.complete && lightboxImage.naturalWidth) {
    show()
  } else {
    lightboxImage.addEventListener('load', show, { once: true })
  }
  document.body.classList.add('lightbox-open')
  lightbox.showModal()
  lightbox.querySelector('[data-close]')?.focus()
}

const closeLightbox = () => {
  lightbox?.close()
}

lightbox?.addEventListener('close', () => {
  document.body.classList.remove('lightbox-open')
  if (lightboxImage) {
    lightboxImage.removeAttribute('src')
    lightboxImage.style.width = ''
  }
  lastTrigger?.focus()
  lastTrigger = null
})

lightbox?.addEventListener('click', (event) => {
  const box = lightbox.getBoundingClientRect()
  const inside =
    event.clientX >= box.left &&
    event.clientX <= box.right &&
    event.clientY >= box.top &&
    event.clientY <= box.bottom
  if (!inside) closeLightbox()
})

lightbox?.querySelector('[data-close]')?.addEventListener('click', closeLightbox)

lightbox?.querySelector('[data-zoom-in]')?.addEventListener('click', () => {
  zoom = Math.min(MAX_ZOOM, +(zoom + ZOOM_STEP).toFixed(2))
  applyZoom()
})

lightbox?.addEventListener('keydown', (event) => {
  if (event.key === '+' || event.key === '=') {
    event.preventDefault()
    zoom = Math.min(MAX_ZOOM, +(zoom + ZOOM_STEP).toFixed(2))
    applyZoom()
  }
  if (event.key === '-' || event.key === '_') {
    event.preventDefault()
    zoom = Math.max(MIN_ZOOM, +(zoom - ZOOM_STEP).toFixed(2))
    applyZoom()
  }
})

lightboxStage?.addEventListener(
  'wheel',
  (event) => {
    if (!event.ctrlKey && !event.metaKey) return
    event.preventDefault()
    zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)).toFixed(2)))
    applyZoom()
  },
  { passive: false },
)

document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
  trigger.addEventListener('click', () => openLightbox(trigger))
})

window.addEventListener('resize', () => {
  if (!lightbox?.open) return
  const previous = baseWidth || fitBaseWidth()
  baseWidth = fitBaseWidth()
  if (previous) zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom))
  applyZoom()
})

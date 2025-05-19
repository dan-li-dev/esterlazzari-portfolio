export const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    // optionally remove the hash from the URL if added manually
    history.replaceState(null, '', ' ') // removes #about if it was there
  }
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

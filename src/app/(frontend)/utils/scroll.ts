export const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const navbarHeight = document.querySelector('header.sticky')?.getBoundingClientRect().height ?? 64
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top, behavior: 'smooth' })
    history.replaceState(null, '', ' ')
  }
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

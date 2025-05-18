import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import Hero from '@/app/(frontend)/containers/HeroPage'
import About from '@/app/(frontend)/containers/AboutPage'
import Publications from '@/app/(frontend)/containers/PublicationsPage'
import Projects from '@/app/(frontend)/containers/ProjectsPage'
import Conferences from '@/app/(frontend)/containers/ConferencesPage'
import Footer from '@/app/(frontend)/containers/Footer'
import Navbar from '@/app/(frontend)/containers/Nav'
import Media from '@/app/(frontend)/containers/MediaPage'
import { Animations } from './scroll-effect'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Publications />
      <Media />
      <Projects />
      <Conferences />
      <Footer />
      <Animations />
    </>
  )
}

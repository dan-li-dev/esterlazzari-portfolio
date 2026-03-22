import { describe, it, expect } from 'vitest'
import { Publications } from '@/collections/Publications'
import { Projects } from '@/collections/Projects'
import { Conferences } from '@/collections/Conferences'
import { MediaCoverage } from '@/collections/MediaCoverage'
import { AboutSection } from '@/globals/AboutSection'
import { FooterSettings } from '@/globals/FooterSettings'
import { SiteSettings } from '@/globals/SiteSettings'

type AnyField = { name?: string; type?: string; required?: boolean; fields?: AnyField[] }

function findField(fields: AnyField[], name: string): AnyField | undefined {
  return fields.find((f) => f.name === name)
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

describe('Publications collection schema', () => {
  const fields = Publications.fields as AnyField[]

  it('has correct slug', () => {
    expect(Publications.slug).toBe('publications')
  })

  it('allows public read access', () => {
    expect(Publications.access?.read?.()).toBe(true)
  })

  it('has required title field', () => {
    const f = findField(fields, 'title')
    expect(f).toBeDefined()
    expect(f?.required).toBe(true)
  })

  it('has required authors field', () => {
    const f = findField(fields, 'authors')
    expect(f).toBeDefined()
    expect(f?.required).toBe(true)
  })

  it('has journal field', () => {
    expect(findField(fields, 'journal')).toBeDefined()
  })

  it('has date field', () => {
    expect(findField(fields, 'date')).toBeDefined()
  })

  it('has paperLink field', () => {
    expect(findField(fields, 'paperLink')).toBeDefined()
  })

  it('has scholarLink field', () => {
    expect(findField(fields, 'scholarLink')).toBeDefined()
  })
})

describe('Projects collection schema', () => {
  const fields = Projects.fields as AnyField[]

  it('has correct slug', () => {
    expect(Projects.slug).toBe('projects')
  })

  it('allows public read access', () => {
    expect(Projects.access?.read?.()).toBe(true)
  })

  it('has required title field', () => {
    const f = findField(fields, 'title')
    expect(f).toBeDefined()
    expect(f?.required).toBe(true)
  })

  it('has required status field', () => {
    const f = findField(fields, 'status')
    expect(f).toBeDefined()
    expect(f?.required).toBe(true)
  })

  it('has pin checkbox field for homepage filtering', () => {
    const f = findField(fields, 'pin')
    expect(f).toBeDefined()
    expect(f?.type).toBe('checkbox')
  })

  it('has richText description field', () => {
    const f = findField(fields, 'description')
    expect(f).toBeDefined()
    expect(f?.type).toBe('richText')
  })
})

describe('Conferences collection schema', () => {
  const fields = Conferences.fields as AnyField[]

  it('has correct slug', () => {
    expect(Conferences.slug).toBe('conferences')
  })

  it('allows public read access', () => {
    expect(Conferences.access?.read?.()).toBe(true)
  })

  it('has required name field', () => {
    const f = findField(fields, 'name')
    expect(f).toBeDefined()
    expect(f?.required).toBe(true)
  })

  it('has required attendance array field', () => {
    const f = findField(fields, 'attendance')
    expect(f).toBeDefined()
    expect(f?.type).toBe('array')
    expect(f?.required).toBe(true)
  })

  it('attendance has date, location, and planned sub-fields', () => {
    const attendance = findField(fields, 'attendance')
    const sub = attendance?.fields ?? []
    expect(findField(sub, 'date')).toBeDefined()
    expect(findField(sub, 'location')).toBeDefined()
    expect(findField(sub, 'planned')).toBeDefined()
  })

  it('planned sub-field is a checkbox', () => {
    const attendance = findField(fields, 'attendance')
    const planned = findField(attendance?.fields ?? [], 'planned')
    expect(planned?.type).toBe('checkbox')
  })
})

describe('MediaCoverage collection schema', () => {
  const fields = MediaCoverage.fields as AnyField[]

  it('has correct slug', () => {
    expect(MediaCoverage.slug).toBe('media-coverage')
  })

  it('allows public read access', () => {
    expect(MediaCoverage.access?.read?.()).toBe(true)
  })

  it.each(['title', 'publisher', 'link'])('has required %s field', (name) => {
    const f = findField(fields, name)
    expect(f, `${name} field`).toBeDefined()
    expect(f?.required).toBe(true)
  })

  it('has required image upload field', () => {
    const f = findField(fields, 'image')
    expect(f).toBeDefined()
    expect(f?.type).toBe('upload')
    expect(f?.required).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------

describe('AboutSection global schema', () => {
  const fields = AboutSection.fields as AnyField[]

  it('has correct slug', () => {
    expect(AboutSection.slug).toBe('about-section')
  })

  it('allows public read access', () => {
    expect(AboutSection.access?.read?.()).toBe(true)
  })

  it('has required bio richText field', () => {
    const f = findField(fields, 'bio')
    expect(f).toBeDefined()
    expect(f?.type).toBe('richText')
    expect(f?.required).toBe(true)
  })

  it('has cv upload field', () => {
    const f = findField(fields, 'cv')
    expect(f).toBeDefined()
    expect(f?.type).toBe('upload')
  })

  it('has twitterUrl text field', () => {
    const f = findField(fields, 'twitterUrl')
    expect(f).toBeDefined()
    expect(f?.type).toBe('text')
  })
})

describe('FooterSettings global schema', () => {
  const fields = FooterSettings.fields as AnyField[]

  it('has correct slug', () => {
    expect(FooterSettings.slug).toBe('footer-settings')
  })

  it('allows public read access', () => {
    expect(FooterSettings.access?.read?.()).toBe(true)
  })

  it('has socialLinks array field with platform and url sub-fields', () => {
    const f = findField(fields, 'socialLinks')
    expect(f).toBeDefined()
    expect(f?.type).toBe('array')
    expect(findField(f?.fields ?? [], 'platform')).toBeDefined()
    expect(findField(f?.fields ?? [], 'url')).toBeDefined()
  })

  it('platform and url sub-fields are required', () => {
    const socialLinks = findField(fields, 'socialLinks')
    const platform = findField(socialLinks?.fields ?? [], 'platform')
    const url = findField(socialLinks?.fields ?? [], 'url')
    expect(platform?.required).toBe(true)
    expect(url?.required).toBe(true)
  })

  it('has copyrightText field', () => {
    expect(findField(fields, 'copyrightText')).toBeDefined()
  })
})

describe('SiteSettings global schema', () => {
  const fields = SiteSettings.fields as AnyField[]

  it('has correct slug', () => {
    expect(SiteSettings.slug).toBe('site-settings')
  })

  it('allows public read access', () => {
    expect(SiteSettings.access?.read?.()).toBe(true)
  })

  it('has publicationsPerPage number field', () => {
    const f = findField(fields, 'publicationsPerPage')
    expect(f).toBeDefined()
    expect(f?.type).toBe('number')
  })

  it('has sections array field with section and visible sub-fields', () => {
    const f = findField(fields, 'sections')
    expect(f).toBeDefined()
    expect(f?.type).toBe('array')
    expect(findField(f?.fields ?? [], 'section')).toBeDefined()
    expect(findField(f?.fields ?? [], 'visible')).toBeDefined()
  })
})

import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })

  // Collect all unique skill names across courses
  const allSkillNames = [
    'Life Tables', 'Population Pyramids', 'Demographic Transition Theory', 'Cohort Analysis',
    'R', 'Stata', 'Linear Regression', 'Logistic Regression', 'Survey Design', 'Hypothesis Testing',
    'Python', 'Census Microdata', 'DHS Surveys', 'Data Wrangling', 'Data Visualization',
    'Event History Analysis', 'Comparative Welfare State Analysis', 'Fertility Measurement',
    'tidyverse', 'ggplot2', 'R Markdown', 'Reproducible Research',
    'Standardization', 'Decomposition Methods', 'Health Inequality Metrics',
  ]

  console.log('Seeding skills...')
  const skillIdMap: Record<string, number> = {}
  for (const name of allSkillNames) {
    const doc = await payload.create({ collection: 'skills', data: { name } })
    skillIdMap[name] = doc.id as number
  }
  console.log(`✓ ${allSkillNames.length} skills seeded`)

  const skill = (...names: string[]): number[] => names.map((n) => skillIdMap[n])

  const courses = [
    {
      // Full details + course link
      courseName: 'Introduction to Demography',
      institution: 'University of Melbourne',
      role: 'instructor' as const,
      startDate: '2023-02-01T00:00:00.000Z',
      endDate: '2023-06-01T00:00:00.000Z',
      description:
        'Undergraduate course covering population dynamics, fertility, mortality, and migration. Students learned to interpret demographic indicators and critically assess population policies.',
      skills: skill('Life Tables', 'Population Pyramids', 'Demographic Transition Theory', 'Cohort Analysis'),
      courseLink: 'https://handbook.unimelb.edu.au/subjects/demo10001',
    },
    {
      // No end date (ongoing)
      courseName: 'Quantitative Methods for Social Research',
      institution: 'University of Melbourne',
      role: 'instructor' as const,
      startDate: '2024-02-01T00:00:00.000Z',
      description:
        'Graduate-level methods course focused on regression analysis, survey design, and statistical inference applied to social science research questions.',
      skills: skill('R', 'Stata', 'Linear Regression', 'Logistic Regression', 'Survey Design', 'Hypothesis Testing'),
      courseLink: 'https://handbook.unimelb.edu.au/subjects/soci90016',
    },
    {
      // No institution
      courseName: 'Applied Data Analysis for Population Studies',
      role: 'co-instructor' as const,
      startDate: '2022-10-01T00:00:00.000Z',
      endDate: '2023-03-01T00:00:00.000Z',
      description:
        'Hands-on course training students to work with large-scale demographic datasets, including census microdata, DHS surveys, and vital registration systems.',
      skills: skill('R', 'Python', 'Census Microdata', 'DHS Surveys', 'Data Wrangling', 'Data Visualization'),
    },
    {
      // No start date (no date info at all)
      courseName: 'Fertility and Family Formation in Europe',
      institution: 'European Doctoral School of Demography',
      role: 'guest-lecturer' as const,
      description:
        'Intensive lecture series on contemporary fertility trends, assisted reproduction, and the impact of policy on family formation across European welfare regimes.',
      skills: skill('Event History Analysis', 'Comparative Welfare State Analysis', 'Fertility Measurement'),
    },
    {
      // No institution, no dates
      courseName: 'Statistical Computing with R',
      role: 'ta' as const,
      description:
        'Supported students in learning R programming for statistical analysis, including data manipulation with tidyverse, visualization with ggplot2, and reproducible reporting with R Markdown.',
      skills: skill('R', 'tidyverse', 'ggplot2', 'R Markdown', 'Reproducible Research'),
    },
    {
      // Full details + course link, single date (start == end)
      courseName: 'Population Health and Epidemiology',
      institution: 'London School of Hygiene & Tropical Medicine',
      role: 'guest-lecturer' as const,
      startDate: '2023-11-01T00:00:00.000Z',
      endDate: '2023-11-01T00:00:00.000Z',
      description:
        'Guest lectures on the intersection of demographic methods and population health, covering standardization techniques, decomposition methods, and health inequality measurement.',
      skills: skill('Standardization', 'Decomposition Methods', 'Health Inequality Metrics', 'Stata'),
      courseLink: 'https://www.lshtm.ac.uk/study/courses/short-courses/population-health',
    },
  ]

  console.log('Seeding teaching...')
  for (const data of courses) {
    await payload.create({ collection: 'teaching', data })
    console.log(`✓ ${data.courseName}${'institution' in data && data.institution ? ` (${data.institution})` : ''}`)
  }
  console.log(`\n✅ ${courses.length} courses seeded`)
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})

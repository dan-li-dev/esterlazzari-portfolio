import { getPayload } from 'payload'
import config from '@payload-config'

const richText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text, version: 1 }],
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const run = async () => {
  const payload = await getPayload({ config })

  // Admin user
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file')
  }
  await payload.create({ collection: 'users', data: { email, password } })
  console.log(`✓ Admin user created (${email})`)

  // Publications
  const publications = [
    {
      title: 'Fertility Trends in Southern Europe: A Comparative Analysis',
      authors: 'Lazzari, E., Rossi, M., & García, J.',
      journal: 'European Journal of Population',
      date: '2023-06-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper1',
      scholarLink: 'https://scholar.example.com/paper1',
    },
    {
      title: 'Assisted Reproductive Technologies and Family Formation',
      authors: 'Lazzari, E. & Müller, K.',
      journal: 'Demographic Research',
      date: '2022-11-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper2',
      scholarLink: 'https://scholar.example.com/paper2',
    },
    {
      title: 'Postponement of Motherhood and Educational Attainment',
      authors: 'Lazzari, E., Dupont, C., & Smith, A.',
      journal: 'Population Studies',
      date: '2022-03-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper3',
    },
    {
      title: 'Childlessness in Europe: Voluntary and Involuntary Pathways',
      authors: 'Lazzari, E.',
      journal: 'Journal of Family Issues',
      date: '2021-09-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper4',
    },
    {
      title: 'Low Fertility and Policy Responses in East-Central Europe',
      authors: 'Lazzari, E. & Kovács, B.',
      journal: 'Population Research and Policy Review',
      date: '2023-02-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper5',
      scholarLink: 'https://scholar.example.com/paper5',
    },
    {
      title: 'Union Dissolution and Fertility Intentions: Evidence from Panel Data',
      authors: 'Lazzari, E., Bertrand, M., & Santos, P.',
      journal: 'European Sociological Review',
      date: '2022-08-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper6',
    },
    {
      title: 'Labor Market Precarity and First Birth Timing in Italy',
      authors: 'Lazzari, E. & Ferrara, G.',
      journal: 'Demographic Research',
      date: '2021-05-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper7',
      scholarLink: 'https://scholar.example.com/paper7',
    },
    {
      title: 'Housing Costs and Family Size: A Cross-National Study',
      authors: 'Lazzari, E., Weber, H., & Johansson, L.',
      journal: 'Journal of Marriage and Family',
      date: '2021-01-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper8',
    },
    {
      title: 'Migration and Fertility: Adaptation vs. Socialization Hypotheses',
      authors: 'Lazzari, E. & Patel, R.',
      journal: 'International Migration Review',
      date: '2020-09-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper9',
    },
    {
      title: 'Grandparental Childcare and Maternal Employment in Southern Europe',
      authors: 'Lazzari, E., Conti, A., & López, R.',
      journal: 'Ageing & Society',
      date: '2020-04-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper10',
      scholarLink: 'https://scholar.example.com/paper10',
    },
    {
      title: 'Work-Family Conflict and Fertility in High-Income Countries',
      authors: 'Lazzari, E. & Klein, S.',
      journal: 'Work, Employment and Society',
      date: '2023-10-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper11',
      scholarLink: 'https://scholar.example.com/paper11',
    },
    {
      title: 'Quantifying the Motherhood Penalty Across European Welfare States',
      authors: 'Lazzari, E., Martínez, C., & Dubois, F.',
      journal: 'European Journal of Social Policy',
      date: '2023-04-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper12',
    },
    {
      title: 'Ideational Change and Fertility Decline in Mediterranean Countries',
      authors: 'Lazzari, E.',
      journal: 'Population and Development Review',
      date: '2022-06-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper13',
      scholarLink: 'https://scholar.example.com/paper13',
    },
    {
      title: 'Cohort Fertility Trends and Educational Gradients in Germany',
      authors: 'Lazzari, E. & Schneider, T.',
      journal: 'Zeitschrift für Soziologie',
      date: '2022-01-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper14',
    },
    {
      title: 'Attitudes Toward Single Motherhood and Fertility Norms',
      authors: 'Lazzari, E., Petrov, I., & Chen, Y.',
      journal: 'Sociology',
      date: '2021-11-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper15',
    },
    {
      title: 'Parental Leave Policies and Second-Birth Rates in Scandinavia',
      authors: 'Lazzari, E. & Lindqvist, M.',
      journal: 'Journal of Social Policy',
      date: '2021-07-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper16',
      scholarLink: 'https://scholar.example.com/paper16',
    },
    {
      title: 'The Role of Social Norms in Shaping Reproductive Behavior',
      authors: 'Lazzari, E., Okonkwo, C., & Fischer, R.',
      journal: 'Population Studies',
      date: '2020-11-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper17',
    },
    {
      title: 'Infertility, Stigma, and Help-Seeking Behavior in Urban Contexts',
      authors: 'Lazzari, E. & Benali, S.',
      journal: 'Social Science & Medicine',
      date: '2020-07-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper18',
    },
    {
      title: 'Economic Uncertainty and Completed Fertility: Evidence from Recession Cohorts',
      authors: 'Lazzari, E., Varga, P., & Nguyen, T.',
      journal: 'Demographic Research',
      date: '2019-12-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper19',
      scholarLink: 'https://scholar.example.com/paper19',
    },
    {
      title: 'Relationship Quality and Fertility Intentions Among Cohabiting Couples',
      authors: 'Lazzari, E. & Papadopoulos, N.',
      journal: 'Journal of Family Psychology',
      date: '2019-06-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper20',
    },
    {
      title: 'Digital Fertility Tracking Apps: Usage Patterns and Implications',
      authors: 'Lazzari, E., Holt, J., & Yamamoto, K.',
      journal: 'Health & Technology',
      date: '2024-02-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper21',
      scholarLink: 'https://scholar.example.com/paper21',
    },
    {
      title: 'Biopolitics and Pronatalist Policy in Contemporary Europe',
      authors: 'Lazzari, E.',
      journal: 'Critical Social Policy',
      date: '2023-08-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper22',
    },
    {
      title: 'Cross-National Variation in Fertility Intentions and Realisation',
      authors: 'Lazzari, E., Barrientos, O., & Hofmann, P.',
      journal: 'European Journal of Population',
      date: '2022-09-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper23',
    },
    {
      title: 'Contraceptive Use and Unintended Pregnancy in Low-Income Contexts',
      authors: 'Lazzari, E. & Osei, K.',
      journal: 'Studies in Family Planning',
      date: '2021-03-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper24',
      scholarLink: 'https://scholar.example.com/paper24',
    },
    {
      title: 'Male Fertility Intentions and Partnership Dynamics',
      authors: 'Lazzari, E., Ruiz, A., & Bauer, G.',
      journal: 'Journal of Marriage and Family',
      date: '2020-02-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper25',
    },
    {
      title: 'Structural Constraints on Childbearing: A Life Course Perspective',
      authors: 'Lazzari, E. & Tremblay, S.',
      journal: 'Advances in Life Course Research',
      date: '2019-09-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper26',
      scholarLink: 'https://scholar.example.com/paper26',
    },
    {
      title: 'Childcare Availability and Fertility: New Evidence from Administrative Data',
      authors: 'Lazzari, E., Novak, M., & Park, J.',
      journal: 'Journal of Public Economics',
      date: '2024-05-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper27',
      scholarLink: 'https://scholar.example.com/paper27',
    },
    {
      title: 'Third Births and Parity Progression in High-Fertility European Regions',
      authors: 'Lazzari, E. & Keller, U.',
      journal: 'Population Space and Place',
      date: '2023-12-01T00:00:00.000Z',
      scholarLink: 'https://scholar.example.com/paper28',
    },
    {
      title: 'Religiosity, Secularization, and Fertility in Western Europe',
      authors: 'Lazzari, E., van den Berg, W., & Costa, F.',
      journal: 'Social Forces',
      date: '2022-04-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper29',
      scholarLink: 'https://scholar.example.com/paper29',
    },
    {
      title: 'Pandemic Fertility Boom or Bust? Evidence from 2020–2022 Birth Data',
      authors: 'Lazzari, E., Esposito, V., & Andersen, B.',
      journal: 'Vienna Yearbook of Population Research',
      date: '2024-09-01T00:00:00.000Z',
      paperLink: 'https://example.com/paper30',
      scholarLink: 'https://scholar.example.com/paper30',
    },
  ]

  console.log('Seeding publications...')
  for (const data of publications) {
    await payload.create({ collection: 'publications', data })
  }
  console.log(`✓ ${publications.length} publications inserted`)

  // Projects
  const projects = [
    {
      title: 'Reproductive Intentions and Outcomes in Post-Pandemic Europe',
      pin: true,
      status: 'Ongoing',
      description: richText(
        'Examining how the COVID-19 pandemic reshaped fertility intentions across six European countries using longitudinal survey data.',
      ),
      date: '2024-01-01T00:00:00.000Z',
      paperLink: 'https://example.com/project1',
    },
    {
      title: 'ART Access Inequalities Across EU Member States',
      pin: true,
      status: 'Ongoing',
      description: richText(
        'Comparative study of access to assisted reproductive technologies, focusing on policy, cost, and socioeconomic barriers.',
      ),
      date: '2023-09-01T00:00:00.000Z',
    },
    {
      title: 'Second Demographic Transition in Southern Europe',
      pin: false,
      status: 'Completed',
      description: richText(
        'Analysis of value changes and their relationship to fertility decline in Italy, Spain, Portugal, and Greece.',
      ),
      date: '2022-05-01T00:00:00.000Z',
      paperLink: 'https://example.com/project3',
    },
    {
      title: 'Gender Norms and Fertility Decisions',
      pin: false,
      status: 'Completed',
      description: richText(
        'Quantitative analysis of how gender role attitudes predict fertility outcomes using European Social Survey data.',
      ),
      date: '2021-01-01T00:00:00.000Z',
    },
  ]

  console.log('Seeding projects...')
  for (const data of projects) {
    await payload.create({ collection: 'projects', data })
  }
  console.log(`✓ ${projects.length} projects inserted`)

  // Conferences
  const conferences = [
    {
      name: 'European Population Conference',
      attendance: [
        { date: '2024-06-12T00:00:00.000Z', location: 'Edinburgh, UK', planned: false },
        { date: '2022-09-01T00:00:00.000Z', location: 'Groningen, Netherlands', planned: false },
      ],
      paperLink: 'https://example.com/epc2024',
    },
    {
      name: 'Population Association of America Annual Meeting',
      attendance: [
        { date: '2024-04-17T00:00:00.000Z', location: 'Columbus, USA', planned: false },
        { date: '2025-04-09T00:00:00.000Z', location: 'Washington D.C., USA', planned: true },
      ],
      paperLink: 'https://example.com/paa2024',
    },
    {
      name: 'International Population Conference',
      attendance: [
        { date: '2021-12-05T00:00:00.000Z', location: 'Virtual', planned: false },
      ],
    },
    {
      name: 'British Society for Population Studies',
      attendance: [
        { date: '2023-09-06T00:00:00.000Z', location: 'London, UK', planned: false },
        { date: '2025-09-10T00:00:00.000Z', location: 'Manchester, UK', planned: true },
      ],
    },
  ]

  console.log('Seeding conferences...')
  for (const data of conferences) {
    await payload.create({ collection: 'conferences', data })
  }
  console.log(`✓ ${conferences.length} conferences inserted`)

  console.log('\n✅ Seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})

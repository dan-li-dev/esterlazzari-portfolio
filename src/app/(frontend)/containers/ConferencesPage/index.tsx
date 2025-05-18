import configPromise from '@payload-config'
import { getPayload } from 'payload'

const formatDateToYear = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    // month: 'long',
    year: 'numeric',
  })
}

const formatConferences = (
  conferences: { id: string; date: string; location: string }[],
): string => {
  return conferences
    .map(({ date, location }) => `${formatDateToYear(date)} - ${location}`)
    .join(', ')
}

const Conferences = async () => {
  const mockConferences = [
    {
      name: 'International Population Conference',
      attendance: [
        { id: '1', date: '2023-05-10', location: 'Vienna' },
        { id: '2', date: '2024-06-15', location: 'Tokyo' },
      ],
    },
    {
      name: 'European Demography Forum',
      attendance: [
        { id: '3', date: '2022-09-20', location: 'Berlin' },
        { id: '4', date: '2023-11-05', location: 'Madrid' },
      ],
    },
    {
      name: 'Asian Population Association Conference',
      attendance: [
        { id: '5', date: '2021-08-12', location: 'Seoul' },
        { id: '6', date: '2023-10-01', location: 'Bangkok' },
      ],
    },
    {
      name: 'PAA Annual Meeting',
      attendance: [
        { id: '7', date: '2022-04-07', location: 'Atlanta' },
        { id: '8', date: '2023-04-12', location: 'New Orleans' },
        { id: '9', date: '2024-04-17', location: 'Columbus' },
      ],
    },
    {
      name: 'Population and Policy Conference',
      attendance: [
        { id: '10', date: '2021-03-15', location: 'London' },
        { id: '11', date: '2023-03-20', location: 'Oslo' },
      ],
    },
  ]

  const payload = await getPayload({ config: configPromise })

  const conferencesQuery = await payload.find({
    collection: 'conferences',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      name: true,
      attendance: true,
    },
  })

  const conferences = conferencesQuery.docs

  return (
    <section
      id="conferences"
      className="bg-gradient-to-br from-primary to-secondary text-white py-32 -mt-0 mb-0 clip-path-conferences"
    >
      <div className="text-center mx-auto px-4">
        <h2 className="text-4xl font-bold  mb-12">Conferences</h2>
        <div className="mt-8 text-xl md:text-2xl">
          <dl className="space-y-4">
            {mockConferences.map((conf, idx) => (
              <div key={idx}>
                <dt className="font-semibold">{conf.name}</dt>
                <dd>
                  {formatConferences(
                    conf.attendance.filter((item) => item.date && item.location && item.id) as {
                      id: string
                      date: string
                      location: string
                    }[],
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default Conferences

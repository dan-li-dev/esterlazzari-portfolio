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
  // const conferences = [
  //   {
  //     title: 'Australian Population Conference',
  //     dates: '(2020 – virtual; 2022 - Canberra)',
  //   },
  //   {
  //     title: 'British Society for Population Studies Conference',
  //     dates: '(2022 – Winchester)',
  //   },
  //   {
  //     title: 'European Population Conference',
  //     dates: '(2022 – Groningen)',
  //   },
  //   {
  //     title: 'International Population Conference',
  //     dates: '(2021 – virtual)',
  //   },
  //   {
  //     title: 'Population Association of America',
  //     dates: '(2021 – virtual; 2022 – Atlanta; 2023 - New Orleans)',
  //   },
  // ]

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

  console.log(conferences)

  return (
    <section
      id="conferences"
      className="bg-gradient-to-br from-primary to-secondary text-white py-32 -mt-0 mb-0 clip-path-conferences"
    >
      <div className="text-center mx-auto px-4">
        <h2 className="text-4xl font-bold  mb-12">Conferences</h2>
        <div className="mt-8 text-xl md:text-2xl">
          <dl className="space-y-4">
            {conferences.map((conf, idx) => (
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

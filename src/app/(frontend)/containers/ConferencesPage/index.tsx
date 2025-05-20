// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
import { getPayloadClient } from '@/app/(frontend)/lib/payload'

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
  const payload = await getPayloadClient()

  const conferencesQuery = await payload.find({
    collection: 'conferences',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    sort: 'name',
    pagination: false,
    select: {
      name: true,
      attendance: true,
    },
  })

  const conferences = conferencesQuery.docs

  return (
    <section
      id="conferences"
      className="bg-gradient-to-br from-primary to-secondary text-white py-32 mb-0 clip-path-conferences"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Conferences</h2>
        <div className="flex flex-col gap-6 text-center text-lg md:text-xl max-w-4xl mx-auto">
          {conferences.map((conf, idx) => (
            <div key={idx}>
              <div className="font-semibold text-white mb-1">{conf.name}</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {/* {conf.attendance.map(({ id, date, location }) => {
                  const year = date ? new Date(date).getFullYear() : undefined
                  return (
                    <span
                      key={id}
                      className="bg-white text-primary font-medium px-3 py-1 rounded-full text-sm shadow-sm"
                    >
                      {year} – {location}
                    </span>
                  )
                })} */}
                {conf.attendance.map(({ id, date, location, planned }) => {
                  const year = date ? new Date(date).getFullYear() : undefined
                  const isPlanned = planned === true
                  return (
                    <span
                      key={id}
                      className={`
        px-3 py-1 rounded-full text-sm font-medium shadow-sm
        ${
          isPlanned
            ? 'bg-yellow-100 text-yellow-800 hover:ring-2 hover:ring-yellow-300 transition'
            : 'bg-white text-primary'
        }
      `}
                    >
                      {year} – {location}
                      {isPlanned && <span className="ml-1 text-xs">(planned)</span>}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Conferences

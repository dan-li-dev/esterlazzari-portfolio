import { getPayloadClient } from '@/app/(frontend)/lib/payload'
import TeachingCard from './TeachingCard'

const Teaching = async () => {
  const payload = await getPayloadClient()

  const teachingQuery = await payload.find({
    collection: 'teaching',
    depth: 1,
    pagination: false,
    overrideAccess: false,
    sort: '-startDate',
    select: {
      courseName: true,
      institution: true,
      role: true,
      startDate: true,
      endDate: true,
      description: true,
      skills: true,
      courseLink: true,
    },
  })

  const courses = teachingQuery.docs

  return (
    courses.length > 0 && (
      <section id="teaching" className="scroll-mt-16 bg-background text-foreground py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-24">
          <h2 className="text-4xl text-center mb-12">Teaching</h2>

          <div className="flex flex-col gap-4">
            {courses.map((course) => {
              const skills =
                course.skills
                  ?.map((s) => (typeof s === 'object' && s !== null ? { id: s.id, name: s.name } : null))
                  .filter((s): s is { id: number; name: string } => s !== null) ?? null

              return (
                <TeachingCard
                  key={course.id}
                  courseName={course.courseName}
                  institution={course.institution}
                  role={course.role}
                  startDate={course.startDate}
                  endDate={course.endDate || null}
                  description={course.description || null}
                  skills={skills}
                  courseLink={course.courseLink || null}
                />
              )
            })}
          </div>
        </div>
      </section>
    )
  )
}

export default Teaching

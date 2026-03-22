import { vi } from 'vitest'

type FindResult<T = Record<string, unknown>> = {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

type MockPayloadOverrides = {
  find?: ReturnType<typeof vi.fn>
  findGlobal?: ReturnType<typeof vi.fn>
}

/**
 * Creates a reusable mock for the Payload client.
 *
 * Usage in test files:
 *
 *   vi.mock('@/app/(frontend)/lib/payload', () => ({
 *     getPayloadClient: vi.fn(),
 *   }))
 *
 *   // Inside beforeEach / it:
 *   vi.mocked(getPayloadClient).mockResolvedValue(
 *     createMockPayload({ find: vi.fn().mockResolvedValue({ docs: [...] }) })
 *   )
 */
export function createMockPayload(overrides: MockPayloadOverrides = {}) {
  const defaultFind = vi.fn().mockResolvedValue({
    docs: [],
    totalDocs: 0,
    totalPages: 0,
    page: 1,
    hasNextPage: false,
    hasPrevPage: false,
  } satisfies FindResult)

  const defaultFindGlobal = vi.fn().mockResolvedValue(null)

  return {
    find: defaultFind,
    findGlobal: defaultFindGlobal,
    create: vi.fn().mockResolvedValue({}),
    update: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
    updateGlobal: vi.fn().mockResolvedValue({}),
    ...overrides,
  }
}

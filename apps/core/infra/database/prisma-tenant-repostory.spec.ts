import { PrismaTenantRepository } from "./preima-tenant-repository"
import { InvalidParamsError } from '../../domain/errors'

describe('PrismaTenantRepostory', () => {
  describe('#create', () => {
     test('should throws InvalidParamsError if params provider are invalid', async () => {
        const sut = new PrismaTenantRepository()

        await expect(sut.create).rejects.toThrowError(new InvalidParamsError())
     })
  })
})
import { LocalAddTenantToCodominium } from "./local-add-tenant-to-codominium"
import { InvalidParamsError } from '../../domain/errors'

describe('LocalAddTenantToCodominium', () => {
  test('should throws InvalidParamsError if tenant provider is invalid', async () => {
    const sut = new LocalAddTenantToCodominium()
    
    const promise = sut.add(null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })
})
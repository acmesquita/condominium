import { LocalAddTenantToCodominium } from "./local-add-tenant-to-codominium"
import { InvalidParamsError } from '../../domain/errors'

describe('LocalAddTenantToCodominium', () => {
  test('should throws InvalidParamsError if tenant provider is invalid', async () => {
    const sut = new LocalAddTenantToCodominium()
    
    const promise = sut.add(null, null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })

  test('should throws InvalidParamsError if codominuimId provider is invalid', async () => {
    const sut = new LocalAddTenantToCodominium()
    const tenant = {
      id: 'any_id'
    }
    const promise = sut.add(tenant, null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })
})
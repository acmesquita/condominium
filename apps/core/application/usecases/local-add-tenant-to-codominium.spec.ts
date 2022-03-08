import { LocalAddTenantToCodominium } from "./local-add-tenant-to-codominium"
import { InvalidParamsError } from '../../domain/errors'

type SutType = {
  sut: LocalAddTenantToCodominium
}

const makeSut = (): SutType => {
  return {
    sut: new LocalAddTenantToCodominium()
  }
}

describe('LocalAddTenantToCodominium', () => {
  test('should throws InvalidParamsError if tenant provider is invalid', async () => {
    const { sut } = makeSut()
    
    const promise = sut.add(null, null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })

  test('should throws InvalidParamsError if codominuimId provider is invalid', async () => {
    const { sut } = makeSut()

    const tenant = {
      id: 'any_id'
    }
    const promise = sut.add(tenant, null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })
})
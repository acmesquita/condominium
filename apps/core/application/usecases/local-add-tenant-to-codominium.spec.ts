import { LocalAddTenantToCodominium } from "./local-add-tenant-to-codominium"
import { InvalidParamsError, UnexpectedError } from '../../domain/errors'
import { TenantRepositorySpy } from "../test/repositories/tenent-repository-spy"

type SutType = {
  sut: LocalAddTenantToCodominium,
  tenantRepositorySpy: TenantRepositorySpy
}

const makeSut = (): SutType => {
  const tenantRepositorySpy = new TenantRepositorySpy()

  return {
    sut: new LocalAddTenantToCodominium(tenantRepositorySpy),
    tenantRepositorySpy
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
    const tenant = { id: 'any_id'}

    const promise = sut.add(tenant, null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })


  test('should throws UnexpectedError if error to add tenant', async () => {
    const tenantRepositorySpy = new TenantRepositorySpy()
    jest.spyOn(tenantRepositorySpy, 'create').mockRejectedValueOnce(new Error())
    
    const sut = new LocalAddTenantToCodominium(tenantRepositorySpy)
    const tenant = { id: 'any_id' }

    const promise = sut.add(tenant, 'any_id')

    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })
})
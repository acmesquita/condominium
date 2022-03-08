import { LocalAddTenantToCodominium } from "./local-add-tenant-to-codominium"
import { InvalidParamsError, UnexpectedError } from '../../domain/errors'
import { TenantRepositorySpy } from "../test/repositories/tenent-repository-spy"
import { Tenant } from "../../domain/entities"
import { TenantRepository } from "../repositories/tenant-repository"
import { Result } from "../../domain/protocols"

type SutType = {
  sut: LocalAddTenantToCodominium,
  tenantRepositorySpy: TenantRepositorySpy,
  tenant: TenantRepository.InsertModel
}

const makeSut = (): SutType => {
  const tenantRepositorySpy = new TenantRepositorySpy()
  const tenant: TenantRepository.InsertModel = {
    apt: 'any_apt',
    document: 'any_document',
    havePat: true,
    name: 'any_name',
    residents: 2
  }

  return {
    sut: new LocalAddTenantToCodominium(tenantRepositorySpy),
    tenantRepositorySpy,
    tenant
  }
}

describe('LocalAddTenantToCodominium', () => {
  test('should throws InvalidParamsError if tenant provider is invalid', async () => {
    const { sut } = makeSut()
    
    const promise = sut.add(null, null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })

  test('should throws InvalidParamsError if codominuimId provider is invalid', async () => {
    const { sut, tenant } = makeSut()

    const promise = sut.add(tenant, null)

    await expect(promise).rejects.toThrowError(new InvalidParamsError())
  })

  test('should throws UnexpectedError if error to add tenant', async () => {
    const tenantRepositorySpy = new TenantRepositorySpy()
    jest.spyOn(tenantRepositorySpy, 'create').mockRejectedValueOnce(new Error())
    
    const sut = new LocalAddTenantToCodominium(tenantRepositorySpy)
    const tenant: TenantRepository.InsertModel = {
      apt: 'any_apt',
      document: 'any_document',
      havePat: true,
      name: 'any_name',
      residents: 2
    }  

    const promise = sut.add(tenant, 'any_id')

    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  test('should return patient when call TenantRepository#create', async () => {
    const { sut, tenant, tenantRepositorySpy } = makeSut()
    tenantRepositorySpy.result = {
      success: true,
      fail: false,
      payload: {
        id: 'any_id',
        ...tenant
      }
    } as Result<Tenant>

    const tenantResult = await sut.add(tenant, 'any_codominuim_id')

    expect(tenantRepositorySpy.tenant).toEqual(tenant)
    expect(tenantResult.success).toBeTruthy()
    expect(tenantResult.payload.id).not.toBeNull()
  })

  test('should return error when call TenantRepository#create return fail', async () => {
    const { sut, tenant, tenantRepositorySpy } = makeSut()
    tenantRepositorySpy.result = {
      success: false,
      fail: true,
      payload: null
    } as Result<Tenant>

    const tenantResult = await sut.add(tenant, 'any_codominuim_id')

    expect(tenantResult.fail).toBeTruthy()
    expect(tenantResult.payload).toBeNull()
  })
})
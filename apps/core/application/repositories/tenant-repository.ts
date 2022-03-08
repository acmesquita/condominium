import { Result } from '../../domain/protocols'
import { Tenant } from '../../domain/entities'

export interface TenantRepository {
  create(tenant: TenantRepository.InsertModel, codominuimId: string): Promise<Result<Tenant>>
}

export namespace TenantRepository {
  export interface InsertModel {
    name: string
    document: string
    apt: string
    residents: number
    havePat: boolean
  }
}
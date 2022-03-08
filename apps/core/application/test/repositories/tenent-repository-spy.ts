import { Tenant } from "../../../domain/entities";
import { Result } from "../../../domain/protocols";
import { TenantRepository } from "../../repositories/tenant-repository";

export class TenantRepositorySpy implements TenantRepository{
  
  result: Result<Tenant>
  tenant: TenantRepository.InsertModel
  codominuimId: string

  async create(tenant: TenantRepository.InsertModel, codominuimId: string): Promise<Result<Tenant>> {
    this.tenant = tenant
    this.codominuimId = codominuimId
    return this.result
  }

}
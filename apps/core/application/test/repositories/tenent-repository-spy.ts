import { Tenant } from "../../../domain/entities";
import { Result } from "../../../domain/protocols";
import { TenantRepository } from "../../repositories/tenant-repository";

export class TenantRepositorySpy implements TenantRepository{
  
  result: Result<Tenant>
  tenant: TenantRepository.InsertModel

  async create(tenant: TenantRepository.InsertModel): Promise<Result<Tenant>> {
    this.tenant = tenant
    return this.result
  }

}
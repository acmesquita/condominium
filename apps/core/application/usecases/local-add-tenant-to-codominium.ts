import { Tenant } from "../../domain/entities";
import { InvalidParamsError, UnexpectedError } from "../../domain/errors";
import { Result } from "../../domain/protocols";
import { TenantRepository } from "../repositories/tenant-repository";

export class LocalAddTenantToCodominium {
  constructor(
    private readonly tenantRepository: TenantRepository
  ){}
  
  async add(tenant: TenantRepository.InsertModel, codominuimId: any): Promise<Result<Tenant>> {
    if (!tenant || !codominuimId) {
      throw new InvalidParamsError()
    }
    try {
      return await this.tenantRepository.create(tenant, codominuimId) 
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
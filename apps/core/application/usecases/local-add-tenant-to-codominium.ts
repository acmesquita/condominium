import { InvalidParamsError, UnexpectedError } from "../../domain/errors";
import { TenantRepository } from "../repositories/tenant-repository";

export class LocalAddTenantToCodominium {
  constructor(
    private readonly tenantRepository: TenantRepository
  ){}
  
  async add(tenant: any, codominuimId: any): Promise<void> {
    if (!tenant || !codominuimId) {
      throw new InvalidParamsError()
    }
    try {
      await this.tenantRepository.create(tenant) 
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
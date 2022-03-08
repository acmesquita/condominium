import { Tenant } from "../../../domain/entities";
import { Result } from "../../../domain/protocols";
import { TenantRepository } from "../../repositories/tenant-repository";

export class TenantRepositorySpy implements TenantRepository{
  
  create(tenant: TenantRepository.InsertModel): Promise<Result<Tenant>> {
    throw new Error("Method not implemented.");
  }

}
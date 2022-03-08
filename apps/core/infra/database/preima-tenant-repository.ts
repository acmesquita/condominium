import { TenantRepository } from "../../application/repositories/tenant-repository";
import { Tenant } from "../../domain/entities";
import { InvalidParamsError } from "../../domain/errors";
import { Result } from "../../domain/protocols";

export class PrismaTenantRepository implements TenantRepository {
  async create(tenant: TenantRepository.InsertModel, codominuimId: string): Promise<Result<Tenant>> {
    if (!tenant || !codominuimId) {
      throw new InvalidParamsError()
    }

    return null
  }

}
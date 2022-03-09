import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { TenantRepository } from "../../application/repositories/tenant-repository";
import { Tenant } from "../../domain/entities";
import { InvalidParamsError } from "../../domain/errors";
import { Result } from "../../domain/protocols";

export class PrismaTenantRepository implements TenantRepository {

  constructor(
    private readonly dbClient: PrismaClient["tenant"]
  ){}

  async create(tenant: TenantRepository.InsertModel, codominuimId: string): Promise<Result<Tenant>> {
    if (!tenant || !codominuimId) {
      throw new InvalidParamsError()
    }

    const result = await this.dbClient.create({
      data: {
        id: randomUUID(),
        ...tenant
      }
    })

    if (result) {
      return {
        success: true,
        fail: false,
        payload: result
      } as unknown as Result<Tenant>
    }
    
    return {
      success: false,
      fail: true,
      payload: null
    } as unknown as Result<Tenant>
  }

}
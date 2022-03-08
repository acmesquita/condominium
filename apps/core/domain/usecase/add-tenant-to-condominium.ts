import { Tenant } from "../entities/tenant";
import { Result } from "../protocols";

export interface AddTenantToCondominium {
  add(tenant: Tenant, comdominiuId: string): Promise<Result>
}

import { InvalidParamsError } from "../../domain/errors";

export class LocalAddTenantToCodominium {
  
  async add(tenant: any, codominuimId: any): Promise<void> {
    if (!tenant || !codominuimId) {
      throw new InvalidParamsError()
    }
  }
}
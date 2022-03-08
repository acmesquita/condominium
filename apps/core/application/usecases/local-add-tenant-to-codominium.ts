import { InvalidParamsError } from "../../domain/errors";

export class LocalAddTenantToCodominium {
  
  async add(tenant: any): Promise<void> {
    if (!tenant) {
      throw new InvalidParamsError()
    }
  }
}
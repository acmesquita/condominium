import { PrismaTenantRepository } from "./prisma-tenant-repository"
import { InvalidParamsError } from '../../domain/errors'
import { TenantRepository } from "../../application/repositories/tenant-repository"
import { prismaMock } from "../../main/config/setupTest"
import { Decimal } from "@prisma/client/runtime"

const makeSut = () => {
	const dbClientTenant = prismaMock['tenant']
	dbClientTenant.create.mockResolvedValueOnce({
		id: 'any_id',
		name: 'any_name',
		havePat: false,
		residents: new Decimal(1),
		document: 'any_doc',
		apartmentId: 'any_apt_id'
	})
	const sut = new PrismaTenantRepository(dbClientTenant)

	return {
		sut,
		dbClientTenant
	}
}

describe('PrismaTenantRepostory', () => {
	describe('#create', () => {
		test('should throws InvalidParamsError if params provider are invalid', async () => {
			const { sut } = makeSut()

			await expect(sut.create).rejects.toThrowError(new InvalidParamsError())
		})

		test('should returns Result if params provider are valid', async () => {
			const { sut } = makeSut()

			const tenant: TenantRepository.InsertModel = {
				name: 'any_name',
				havePat: false,
				residents: 1,
				document: 'any_doc',
				apartmentId: 'any_apt_id'
			}

			const result = await sut.create(tenant, 'any_codominium_id')

			expect(result.success).toBe(true)
			expect(result.payload.id).toBeTruthy()
		})
	})
})
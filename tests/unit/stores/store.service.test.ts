import { StoreService } from "@features/stores/service/store.service.js";
import { StoreRepository } from "@features/stores/repository/store.repository.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { ERROR_CODES } from "@shared/errors/index.js";
import { createStore } from "../../factories/store.factory";

type StoreWithPizzas = NonNullable<Awaited<ReturnType<StoreRepository["findById"]>>>;
const storeMock: StoreWithPizzas = createStore();

describe("StoreService", () => {
    let storeService: StoreService;
    let mockStoreRepository: jest.Mocked<StoreRepository>;

    beforeEach(() => {
        mockStoreRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
        } as unknown as jest.Mocked<StoreRepository>;
        storeService = new StoreService(mockStoreRepository);
    });

    it("should throw STORE_NOT_FOUND when store does not exist", async () => {
        mockStoreRepository.findById.mockResolvedValue(null);
        await expect(storeService.getStoreById("store-id")).rejects.toMatchObject({
            status: HTTP_STATUS.NOT_FOUND,
            message: ERROR_CODES.RESOURCE.STORE_NOT_FOUND,
        });
    });

    it("should return store details when store exists", async () => {
        mockStoreRepository.findById.mockResolvedValue(storeMock);
        const result = await storeService.getStoreById("store-1");
        expect(result).toEqual({
            id: "store-1",
            name: "Pizza Store",
            imageUrl: "store.png",
            address: "Street 1",
            description: "Best pizzas",
            pizzas: [
                {
                    id: "pizza-1",
                    name: "Pepperoni",
                    imageUrl: "pizza.png",
                    description: "Pepperoni pizza",
                    price: 25000,
                },
            ],
        });
    });

    it("should return stores with total count", async () => {
        mockStoreRepository.findAll.mockResolvedValue({ stores: [storeMock, storeMock], total: 2 });
        const result = await storeService.getStores(1, 10);
        expect(result.total).toBe(2);
        expect(result.data).toHaveLength(2);
    });

    it("should map stores correctly", async () => {
        mockStoreRepository.findAll.mockResolvedValue({ stores: [storeMock, storeMock], total: 2 });
        const result = await storeService.getStores(1, 10);
        expect(result.data[0]).toEqual({
            id: "store-1",
            name: "Pizza Store",
            imageUrl: "store.png",
            address: "Street 1",
        });
    });

    it("should return empty stores list", async () => {
        mockStoreRepository.findAll.mockResolvedValue({ stores: [], total: 0 });
        const result = await storeService.getStores(1, 10);
        expect(result).toEqual({
            data: [],
            total: 0,
        });
    });
});

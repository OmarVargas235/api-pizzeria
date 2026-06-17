import { ERROR_CODES, AppError } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import type { StoreRepository } from "../repository/store.repository.js";
import type { StoresDto, StoreDetailsResponseDto } from "../dto/store-response.dto.js";

export class StoreService {
    constructor(private readonly storeRepository: StoreRepository) {}

    getStores = async (page: number, limit: number): Promise<StoresDto> => {
        const { stores, total } = await this.storeRepository.findAll(page, limit);
        return {
            data: stores.map((store) => ({
                id: store.id,
                name: store.name,
                imageUrl: store.imageUrl,
                address: store.address,
            })),
            total,
        };
    };

    getStoreById = async (id: string): Promise<StoreDetailsResponseDto> => {
        const store = await this.storeRepository.findById(id);
        if (!store) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.RESOURCE.STORE_NOT_FOUND);
        }
        return {
            id: store.id,
            name: store.name,
            imageUrl: store.imageUrl,
            address: store.address,
            description: store.description,
            pizzas: store.pizzas.map((pizza) => ({
                id: pizza.id,
                name: pizza.name,
                imageUrl: pizza.imageUrl,
                description: pizza.description,
                price: pizza.price.toNumber(),
            })),
        };
    };
}

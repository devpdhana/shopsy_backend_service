import store_repo from "../repositories/store_repository";
import { api_response_dto } from "../dtos/api_response_dto";
import { store_response_dto } from "../dtos/store_dto";
import { pagination } from "../dtos/pagination";

const create_store_service = async (
    store_name: string,
    store_description: string,
    store_theme_color: string,
    user_id: string
) => {
    try {
        const store = await store_repo.create_store(store_name, store_description, store_theme_color, user_id);
        const response: api_response_dto<store_response_dto> = {
            data: {
                store_id: store.store_id,
                store_name: store.store_name,
                store_description: store.store_description,
                store_theme_color: store.store_theme_color,
                user_id: store.user_id,
                created_at: store.created_at,
                modified_at: store.modified_at,
            },
            status: 201,
            message: "Store created successfully"
        };
        return response;
    } catch (error) {
        throw error;
    }
};

const get_stores_by_user_service = async (user_id: string, pagination: {skip: number, limit: number}) => {
    try {
        const { skip, limit } = pagination;
        const stores = await store_repo.get_stores_by_user(user_id, skip, limit);
        const response: api_response_dto<pagination<store_response_dto[]>> = {
            data: {
                data: stores.map((store) => ({
                    store_id: store.store_id,
                    store_name: store.store_name,
                    store_description: store.store_description,
                    store_theme_color: store.store_theme_color,
                    user_id: store.user_id,
                    created_at: store.created_at,
                    modified_at: store.modified_at,
                })),
                skip,
                limit
            },
            status: 200,
            message: "Stores retrieved successfully"
        };
        return response;
    } catch (error) {
        throw error;
    }
};

const get_store_by_id_service = async (store_id: string) => {
    try {
        const store = await store_repo.get_store_by_id(store_id);
        if (!store) {
            const response: api_response_dto<null> = {
                data: null,
                status: 404,
                message: "Store not found"
            };
            return response;
        }
        const response: api_response_dto<store_response_dto> = {
            data: {
                store_id: store.store_id,
                store_name: store.store_name,
                store_description: store.store_description,
                store_theme_color: store.store_theme_color,
                user_id: store.user_id,
                created_at: store.created_at,
                modified_at: store.modified_at,
            },
            status: 200,
            message: "Store retrieved successfully"
        };
        return response;
    } catch (error) {
        throw error;
    }
};

const update_store_service = async (
    store_id: string,
    store_name: string,
    store_description: string,
    store_theme_color: string
) => {
    try {
        const store = await store_repo.get_store_by_id(store_id);
        if (!store) {
            const response: api_response_dto<null> = {
                data: null,
                status: 404,
                message: "Store not found"
            };
            return response;
        }
        const updated_store = await store_repo.update_store(store_id, store_name, store_description, store_theme_color);
        const response: api_response_dto<store_response_dto> = {
            data: {
                store_id: updated_store.store_id,
                store_name: updated_store.store_name,
                store_description: updated_store.store_description,
                store_theme_color: updated_store.store_theme_color,
                user_id: updated_store.user_id,
                created_at: updated_store.created_at,
                modified_at: updated_store.modified_at,
            },
            status: 200,
            message: "Store updated successfully"
        };
        return response;
    } catch (error) {
        throw error;
    }
};

const delete_store_service = async (store_id: string) => {
    try {
        const store = await store_repo.get_store_by_id(store_id);
        if (!store) {
            const response: api_response_dto<null> = {
                data: null,
                status: 404,
                message: "Store not found"
            };
            return response;
        }
        await store_repo.delete_store(store_id);
        const response: api_response_dto<null> = {
            data: null,
            status: 200,
            message: "Store deleted successfully"
        };
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    create_store_service,
    get_stores_by_user_service,
    get_store_by_id_service,
    update_store_service,
    delete_store_service,
};
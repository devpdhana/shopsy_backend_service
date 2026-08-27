import prisma from "../configs/prisma"

const create_store = async (store_name: string, store_description: string, store_theme_color: string, user_id: string) => {
    try {
        const response = await prisma.store.create({
            data: {
                store_name,
                store_description,
                store_theme_color,
                user_id,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const get_stores_by_user = async (user_id: string, skip: number, limit: number) => {
    try {
        const stores = await prisma.store.findMany({
            where: { user_id },
            skip,
            take: limit,
        });
        return stores;
    } catch (error) {
        throw error;
    }
};

const get_store_by_id = async (store_id: string) => {
    try {
        const store = await prisma.store.findUnique({
            where: { store_id },
        });
        return store;
    } catch (error) {
        throw error;
    }
};

const update_store = async (
    store_id: string,
    store_name: string,
    store_description: string,
    store_theme_color: string,
    sub_domain: string,
    social_links: string[],
    currency: string,
    is_published: boolean
) => {
    try {
        const response = await prisma.store.update({
            where: { store_id },
            data: {
                store_name,
                store_description,
                store_theme_color,
                sub_domain,
                social_links,
                currency,
                is_published
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const delete_store = async (store_id: string) => {
    try {
        const response = await prisma.store.delete({
            where: { store_id },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    create_store,
    get_stores_by_user,
    get_store_by_id,
    update_store,
    delete_store,
};
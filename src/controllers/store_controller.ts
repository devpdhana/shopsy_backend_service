import express, { Request, Response } from 'express'
import store_service from '../services/store_service'
import type { pagination } from '../dtos/pagination'



const store_router = express.Router()

store_router.post("/", async (req: Request, res: Response) => {
    try {
        const { store_name, store_description, store_theme_color } = req.body;
        const user_id = req.payload?.user || "";
        const response = await store_service.create_store_service(
            store_name,
            store_description,
            store_theme_color,
            user_id
        );
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: `Internal server error ${error}`
        })
    }
})

store_router.get("/user", async (req: Request, res: Response) => {
    try {
        const user_id = req.payload?.user || "";
        const pagination: {skip: number, limit: number} = {
            limit: Number(req.query.limit) || 10,
            skip: Number(req.query.skip) || 0,
        };
        const response = await store_service.get_stores_by_user_service(user_id, pagination);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal server error"
        })
    }
})

store_router.get("/:store_id", async (req: Request, res: Response) => {
    try {
        const { store_id } = req.params as { store_id: string };
        const response = await store_service.get_store_by_id_service(store_id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal server error"
        })
    }
})

store_router.put("/:store_id", async (req: Request, res: Response) => {
    try {
        const { store_id } = req.params as { store_id: string };
        const { store_name, store_description, store_theme_color } = req.body;
        const response = await store_service.update_store_service(
            store_id,
            store_name,
            store_description,
            store_theme_color
        );
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal server error"
        })
    }
})

store_router.delete("/:store_id", async (req: Request, res: Response) => {
    try {
        const { store_id } = req.params as { store_id: string };
        const response = await store_service.delete_store_service(store_id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal server error"
        })
    }
})

export default store_router
import express from "express";
import postControllers from "../controllers/PostController.js";

const router = express.Router();

// To get all Posts
router.get("/", postControllers.post_get_all_post);
router.post("/", postControllers.post_create_post);

// To get Posts of specific User
router.get("/username", postControllers.post_get_all_post_username);

router.get("/:id", postControllers.post_get_one);

router.delete("/:id", postControllers.post_delete_one);

export default router;

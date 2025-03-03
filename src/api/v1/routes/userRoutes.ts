import express, { Router } from "express";
import { getUserDetails, deleteUser } from "../controllers/userController";
import { authenticate } from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/** Route to get user details (requires authentication and admin role). */
router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    getUserDetails
);

/** Route to delete a user (requires authentication and admin role). */
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    deleteUser
);

export default router;

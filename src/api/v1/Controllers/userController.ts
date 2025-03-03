import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";
import { auth } from "../../../../config/firebaseconfig";
import { successResponse } from "../models/responseModel";

const OK: number = 200;

/**
 * Controller to get the user profile.
 * @param req - Incoming request object.
 * @param res - Response object to send the user profile response.
 * @param next - Next middleware function.
 */
export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId: string = res.locals.uid;
        const user: UserRecord = await auth.getUser(userId);
        res.status(OK).json(successResponse(user));
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to delete a user (requires admin role).
 * @param req - Incoming request object.
 * @param res - Response object to confirm deletion.
 * @param next - Next middleware function.
 */
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId: string = req.params.id;
        await auth.deleteUser(userId);
        res.status(OK).json({ message: User ${userId} deleted by admin });
    } catch (error) {
        next(error);
    }
};

import type { Request, Response } from "express";
import { ok } from "@shared/http/responses.js";
import type { ProfileService } from "../service/profile.service.js";
import { updateProfileSchema } from "../dto/update-profile.schema.ts.js";

export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    getProfile = async (req: Request, res: Response) => {
        const userId = req.user!.userId;
        const profile = await this.profileService.getProfile(userId);
        return ok(res, profile, "Profile fetched successfully");
    };

    updateProfile = async (req: Request, res: Response) => {
        const userId = req.user!.userId;
        const dto = updateProfileSchema.parse(req.body);
        const profile = await this.profileService.updateProfile(userId, {
            firstName: dto.firstName,
            lastName: dto.lastName,
        });
        return ok(res, profile, "Profile updated successfully");
    };

    updateAvatar = async (req: Request, res: Response) => {
        const userId = req.user!.userId;
        const result = await this.profileService.updateAvatar(userId, req.file!);
        return ok(res, result, "Avatar updated successfully");
    };
}

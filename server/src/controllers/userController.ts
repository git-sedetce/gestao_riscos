import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
  // GET /users/current
  show: async (req: AuthenticatedRequest, res: Response) => {
    const currentUser = req.user;
    try {
      return res.json(currentUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  // GET /users/:id
  showId: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
      const user = await userService.findByIdWithRisks(id);
      return res.json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showCurrentId: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
      const currentUser = req.user;
      const user = await userService.findByCurrentId(id, currentUser);
      return res.json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  update: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, email, entityId, profileId, isActive } = req.body;

    try {
      const user = await userService.findByNumberId(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await userService.update(id, {
        name,
        email,
        entityId,
        profileId,
        isActive,
      });

      return res.status(200).json(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  // PUT /users/current
  updateCurrent: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;
    const { name, email, entityId } = req.body;

    try {
      const updatedUser = await userService.updateCurrentUser(id, {
        name,
        email,
        entityId,
      });

      return res.json(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // PUT /users/current/password
  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;
    const { currentPassword, newPassword } = req.body;

    user.checkPassword(currentPassword, async (err, isSame) => {
      try {
        if (err) return res.status(400).json({ message: err.message });
        if (!isSame)
          return res.status(400).json({ message: "Senha incorreta" });

        await userService.updatePassword(user.id, newPassword);
        return res.status(204).send();
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    });
  },
};

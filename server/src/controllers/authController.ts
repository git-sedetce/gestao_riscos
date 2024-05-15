import { Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export const authController = {
  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { name, email, entityId, password, isActive, accessed_at } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      const user = await userService.create({
        name,
        email,
        entityId,
        password,
        profileId: 4,
        isActive,
        sign_in_count: 0,
        accessed_at,
      });

      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  //POST /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "E-mail não registrado" });
      }

      if (!user.isActive) {
        return res
          .status(401)
          .json({
            message:
              "Sua conta está desativada. Entre em contato com o suporte.",
          });
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) return res.status(400).json({ message: err.message });
        if (!isSame)
          return res.status(401).json({ message: "Senha incorreta" });

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        user.update({
          sign_in_count: user.sign_in_count + 1,
          accessed_at: new Date(),
        });

        const token = jwtService.signToken(payload, "90d");

        return res.json({ authenticated: true, ...payload, token });
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

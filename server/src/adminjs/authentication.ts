import { AuthenticationOptions } from "@adminjs/express";
import { User } from "../models";
import bcrypt from 'bcrypt'

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email }})

    // if (user) {
    //   const matched = await bcrypt.compare(password, user.password)

    //   if (matched) {
    //     return user
    //   }
    // }

    if (user) {
      const matched = await bcrypt.compare(password, user.password)

      if (matched) {
        return user
      }
    }

    return false
  },
  cookiePassword: 'senha-de-cookie'
}

export const hasAdminPermission = (currentUser: { role: string; }) => {
  return currentUser && currentUser.role === 'admin'
}

export const hasUserPermission = (currentUser: { role: string; }) => {
  return currentUser && ["admin", "user"].includes(currentUser.role);
}
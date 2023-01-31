import AdminJs, {PageHandler} from 'adminjs'
import { Category, Risk, Treatment, User } from "../models"

export const dashboardOptions: {
  handler?: PageHandler
  component?: string
} = {
  component: AdminJs.bundle("./components/Dashboard"),
    handler: async (req, res, context) => {
      const risks = await Risk.count()
      const treatments = await Treatment.count()
      const categories = await Category.count()
      const adminUsers = await User.count({ where: { role: 'admin' }})
      const standardUsers = await User.count( { where: { role: 'user'}})

      res.json({
        'Riscos': risks,
        'Tratamentos': treatments,
        'Categorias': categories,
        'Administradores': adminUsers,
        'Usuários': standardUsers
      })
    }
}


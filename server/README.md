## 💻Códigos

```bash
# Criar arquivo .sequelizerc na raiz
// .sequelizerc

$ const path = require('path');

$ module.exports = {
  'config': path.resolve('config', 'sequelizeCli.js'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'database', 'seeders'),
  'migrations-path': path.resolve('src', 'database', 'migrations')
};

# Criar database sequelize
$ npx sequelize-cli db:create

# Criar tabelas no database
$ npx sequelize-cli migration:generate --name create-categories-table

# Subir a tabela
$ npx sequelize-cli db:migrate

# Criar seed:
$ npx sequelize-cli seed:generate --name seed-risks-table
$ npx sequelize-cli seed:generate --name create-admin-user

# Subir seed - Desfazer seed:
$ npx sequelize-cli db:seed:all
$ npx sequelize-cli db:seed:undo:all


# Subir seed especifico
$ npx sequelize-cli db:seed --seed src/database/seeders/XXXXXXXXXXXXXX-create-admin-user.js
```

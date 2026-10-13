# CarGas Site

A website and admin panel for a fictional gas station, built as a university web programming project. It covers the same domain three ways: a server-rendered Express app, a REST API on a relational database, and a Vue single-page app.

## What's in here

| Folder | What it is | Port |
| --- | --- | --- |
| `cargas/` | Express app serving the public site and the admin panel. Stores fuels, products, services and orders in JSON files, validates input with Joi. | 8000 |
| `api_servis/` | REST API on Express and Sequelize (MariaDB) with models, migrations and seeders for products, fuels, services and orders. | 9001 |
| `vezba4vue/` | Vue 2 single-page app (Vue Router, Vuex, Bootstrap-Vue). | dev server |
| `vezba4node/` | Small Express server that serves the built Vue app. | 8430 |

Domain names in the code are Serbian: `gorivo` (fuel), `proizvod` (product), `usluga` (service), `narudzbina` (order).

## Running it

Each folder is its own Node project.

```bash
cd cargas
npm install
node app.js
```

The site is then on http://localhost:8000 and the admin panel on http://localhost:8000/admin.

For the API you need a local MariaDB with a database named `cargas` (connection settings are in `api_servis/config/config.json`):

```bash
cd api_servis
npm install
node app.js
```

Note that the API recreates its tables on every start (`sequelize.sync({ force: true })`), so it is for local development only.

For the Vue app:

```bash
cd vezba4vue
npm install
npm run serve
```

## Status

Coursework from 2023, not maintained.

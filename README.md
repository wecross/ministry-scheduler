# ministry-scheduler

Contains [frontend](./frontend) and [backend](./backend) folders

## How to Contribute 🤝

Check out our [__Contributing Guide__](./contributing.md).

## Frontend

### Installation

```sh
$ npm i
```

### Running in dev

You first need to add the following files locally:

- add `.env` file in `frontend/prisma` - it should contain the following line: `DB_URL="file:./dev.db"`
- add `dev.db` file in `frontend/prisma`
- add `initial-data.ts` file in `frontend/prisma`

```sh
$ npm run dev
```

Navigate to [localhost:3000](http://localhost:3000)

### Adding pages

The convention is that anything in `src/pages`, with an extension `.page.tsx` becomes a publicly available page. NOTE nextjs also offers the ability to define custom routes with placeholder support - eg `:id.tsx` if we will need it in the future.

We've added the `.page` convention because we might want to add other files in `pages` folder, that should not be accessible.

### Setting up the DB locally

After you've run `npm i`, make sure you run `npm run db-generate` in order to generate the typescript types and db bindings needed for prisma.

Check that everything is ok by running `npm run check-db`

### DB Schema

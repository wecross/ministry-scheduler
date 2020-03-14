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

```sh
$ npm run dev
```

Navigate to [localhost:3000](http://localhost:3000)

### Adding pages

The convention is that anything in `src/pages`, with an extension `.page.tsx` becomes a publicly available page. NOTE nextjs also offers the ability to define custom routes with placeholder support - eg `:id.tsx` if we will need it in the future.

We've added the `.page` convention because we might want to add other files in `pages` folder, that should not be accessible.

# Formula 1

This application list all F1 seasons and its results. [Live App](https://formula1-rho.vercel.app/)

## To run the project

- Install NPM if you dont have it already. [Download Here](https://nodejs.org/en/download)
- Install Yarn if you dont have it already.

```bash
npm install --global yarn
```

- Install the project dependencies.

```bash
yarn install
```

- Run the dev environment in localhost.

```bash
yarn dev
```

## Used packages and tools

- React.js: Frontend library used to run build modern client apps.
  - We could also use Next.js but non of the requirements needs its features.
- FluentUI: Provides ready to use UI components which is full accessible, modern, customizable and easy to use.
- React-router: Provides seamless navigation in the browser - client side rendering (CSR).
- React-query: Used for two purposes
  - API client library that deal with API calls and provides beautiful features.
  - State management, it is not the best and not made for that purpose, but used it as the app state is not that complicated. better alternatives are react-context or Zustand.
- Other tools: Typescript, Eslint, Prettier.

## Folders

- API: contains the client library of the API and its types.
- components: contains shared components across the application.
- context: contains state managements.
- helpers: contains the shared utils and hooks across the project.
- pages: contains the application pages.

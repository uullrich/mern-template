import { App } from "./app";

const app = new App();
app
  .start()
  .then(() => {})
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(() => {});

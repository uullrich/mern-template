import { App } from "./app.js";

const app = new App();
app
  .start()
  .then(() => {})
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(() => {});

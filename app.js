const express = require("express");
const { ErrorHandler } = require("./middleware/errorHandler");
const { NotFoundHandler } = require("./middleware/notfound");
const { initModels } = require("./config/initModels");
const mainRouter = require("./app.router");
const cors = require("cors");
const swaggerConfig = require("./config/swagger");
const log = require("./utils/logger");
require("dotenv").config();

async function main() {
  const app = express();
  await initModels();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //routes
  app.use(mainRouter);
  swaggerConfig(app);
  app.use(NotFoundHandler);
  app.use(ErrorHandler);
  const port = process.env.PORT ?? 3000;
  app.listen(port, () => {
    log.info(`app is running on port: http://localhost:${port}`);
    log.info(`swagger run on port: http://localhost:${port}/swagger`);
  });
}

main();

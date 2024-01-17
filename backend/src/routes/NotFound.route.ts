import { Router, Request, Response } from "express";

const notFoundRouter = Router();

notFoundRouter.get("/", (request: Request, response: Response) => {
  if (request.accepts("json")) {
    response.json({ error: "404 Not Found" });
  } else {
    response.type("txt").send("404 Not Found");
  }
});

export default notFoundRouter;

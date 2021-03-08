import { Router } from "express";
import { ToolsController } from "./controllers/ToolsController";

const router = Router();
const toolsController = new ToolsController();

router.post("/tools", toolsController.create);

export { router };

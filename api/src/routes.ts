import { Router } from "express";
import { ToolsController } from "./controllers/ToolsController";

const router = Router();
const toolsController = new ToolsController();

router.post("/tools", toolsController.create);
router.get("/", toolsController.show);
router.get("/tools", toolsController.filter);
router.delete("/tools/:id", toolsController.delete);

export { router };

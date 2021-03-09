import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ToolsRepository } from "../repositories/ToolsRepository";

class ToolsController {
  async create(req: Request, res: Response) {
    const { title, link, description, tags } = req.body;

    const toolRepository = getCustomRepository(ToolsRepository);

    const tool = toolRepository.create({
      title,
      link,
      description,
      tags,
    });

    await toolRepository.save(tool);

    return res.status(201).json(tool)
  }

  async show(req: Request, res: Response) {
    const toolRepository = getCustomRepository(ToolsRepository);

    const all = await toolRepository.find();

    return res.json(all);
  }
}

export { ToolsController };

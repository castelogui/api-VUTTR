import { Request, Response } from "express";
import { getCustomRepository, Like } from "typeorm";
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

    return res.status(201).json(tool);
  }

  async show(req: Request, res: Response) {
    const toolRepository = getCustomRepository(ToolsRepository);

    const all = await toolRepository.find();

    return res.json(all);
  }

  async filter(req: Request, res: Response) {
    let tags = req.query.tags;

    const toolRepository = getCustomRepository(ToolsRepository);

    const toolsForTag = await toolRepository.find({
      where: { tags: Like(`%${tags}%`) },
    });

    return res.json(toolsForTag);
  }
}

export { ToolsController };

import { Request, Response } from "express";
import { getCustomRepository, Like } from "typeorm";
import { ToolsRepository } from "../repositories/ToolsRepository";
import { AppError } from "../errors/AppError";
import * as yup from "yup";

class ToolsController {
  async create(req: Request, res: Response) {
    const { title, link, description, tags } = req.body;

    const schema = yup.object().shape({
      title: yup.string().min(1),
      link: yup.string().url(),
      description: yup.string().min(1),
      tags: yup.array().min(1),
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(
        `Alguns dados não foram preenchidos corretamente. ${err}`,
        400
      );
    }

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

    if (all.length == 0) {
      throw new AppError("Nenhuma ferramenta encontrada!", 400);
    }

    return res.json(all);
  }

  async filter(req: Request, res: Response) {
    const tags = req.query.tags;

    const toolRepository = getCustomRepository(ToolsRepository);

    const toolsForTag = await toolRepository.find({
      where: { tags: Like(`%${tags}%`) },
    });

    if (toolsForTag.length == 0) {
      throw new AppError(
        `Nenhuma ferramenta encontrada com a tag "${tags}"`,
        400
      );
    }

    return res.json(toolsForTag);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const toolRepository = getCustomRepository(ToolsRepository);

    const tool = await toolRepository.findOne({
      where: { id: id },
    });

    if (!tool) {
      return res.status(404).json({ error: "Id not found" });
    } else {
      await toolRepository
        .createQueryBuilder()
        .delete()
        .from("tools")
        .where("id = :id", { id: id })
        .execute();

      return res.status(204).json("Deleted!");
    }
  }
}

export { ToolsController };

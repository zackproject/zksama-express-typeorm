
import { CharacterModel } from "./../models/characters"
import { Request, Response } from "express";

// MVC : Controler
export class CharacterControler {
    static async getAll(req: Request, res: Response) {
        const allCharacters = await CharacterModel.getAll();
        res.json(allCharacters);
    };

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const characterId = await CharacterModel.getById(id)
        if (!characterId) {
            return res.status(404).json({ message: `Character ${id} not found` });
        }
        res.json(characterId);
    };

    static async getBySerie(req: Request, res: Response) {
        const { serie } = req.params;
        const characterSerie = await CharacterModel.getBySerie(serie);
        res.json(characterSerie);
    };

    static async getAllSeries(req: Request, res: Response) {
        const characterSerie = await CharacterModel.getAllSeries()
        res.json(characterSerie);
    };

    static async post(req: Request, res: Response) {
        const { name, image, serie } = req.body;
        if (req.body.id) {
            return res.status(405).json({ message: `405 Not Allowed : The 'id' must be autogenerated` });
        }
        if (!name || !image || !serie) {
            return res.status(400).json({ message: `400 Bad Request : Invalid argument` });
        }
        const results = await CharacterModel.post({ name, image, serie })
        return res.status(201).send(results);
    };

    static async modify(req: Request, res: Response) {
        const { name, image, serie } = req.body;
        const { id } = req.params;
        if (!name || !image || !serie) {
            return res.status(400).json({ message: `400 Bad Request : Invalid argument` });
        }
        const nCharacter = await CharacterModel.getById(id)
        if (!nCharacter) {
            return res.status(404).json({ message: `Character ${id} not found` });
        }
        const results = CharacterModel.modify(nCharacter, { name, image, serie });
        return res.status(201).send(results);
    };

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const isDeleted = await CharacterModel.delete(id)
        if (isDeleted) {
            return res.status(200).json({ message: `Character '${id}' deleted succesfully` });
        }
        return res.status(404).json({ message: `Character '${id}' not found` });
    };
}

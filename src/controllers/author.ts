import { NextFunction,Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/author";

// const createAuthor = (req: Request, res:Response, next: NextFunction ) => {
//     const {name} = req.body;

//     const author = new Author({
//         _id: new mongoose.Types.ObjectId(),
//         name
//     });
//     return author
//         .save()
//         .then((author) => res.status(201).json({author}))
//         .catch((error) => res.status(500).json({error}));
// };

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
  
    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name
    });
  
    try {
      const savedAuthor = await author.save();
      res.status(201).json({ author: savedAuthor });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

const readAuthor = (req: Request, res:Response, next: NextFunction ) => {
    const { authorID } = req.body;

    return Author.findById(authorID)
        .then((author) => author ? res.status(200).json({author}) : res.status(404).json({message: 'false'}))
        .catch((error) => res.status(500).json(error));
    };
const readAllAuthor = (req: Request, res:Response, next: NextFunction ) => {
    return Author.find()
    .then((author) => author ? res.status(200).json({author}) : res.status(404).json({message: 'false'}))
    .catch((error) => res.status(500).json(error));
}
const UpdateAuthor = (req: Request, res:Response, next: NextFunction ) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);

                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
}
const DeleteAuthor = (req: Request, res:Response, next: NextFunction ) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ author, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }))
}

export default { createAuthor, readAuthor, readAllAuthor, UpdateAuthor, DeleteAuthor };

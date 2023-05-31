import mongoose ,{Document, Schema} from "mongoose";


export interface Iauthor {
    name: string;
}

export interface IAuthorModel extends Iauthor, Document {}

const AuthorSchema : Schema = new Schema (
    {
        name : { type : String, require: true} 
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);


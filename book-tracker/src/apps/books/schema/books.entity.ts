import {
    Schema, model, Types
} from 'mongoose';
import { Book } from '../interface/book.interface';
import { EStatus } from '../interface/book.interface';
import { v4 as uuid } from 'uuid';

export const BookSchema = new Schema<Book>({

    bookId: {type: String, default: uuid, unique: true},

    title: String,

    author: String,

    finishedAt: {type: Date, required: false, default: null},

    grade: {type: Number, required: false, default: null, min: 0, max: 10},

    status: {type: String, required: false, default: EStatus.QUERO_LER, enum: EStatus},

    userId: {type: String, required: true, ref: 'User'},
    
},{ timestamps: true, versionKey: false});

export const BookModel = model<Book>('Book', BookSchema);
import {
  Schema, model, Types
} from 'mongoose';
import { IUser } from "./../interface/user.interface";
import { v4 as uuid } from 'uuid';

export const UserSchema = new Schema<IUser>({
    name: {type: 'string', required: true},
    id: {type: String, default: uuid},
});


export const UserModel = model<IUser>('User', UserSchema);
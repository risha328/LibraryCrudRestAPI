import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export enum Category {
    ADVENTURE = 'Adventure',
    ROMANCE = 'Romance',
    HORROR = 'Horror',
    SCIENCE_FICTION = 'Science Fiction',
    FANTASY = 'Fantasy',
    MYSTERY = 'Mystery',
    THRILLER = 'Thriller',
    NON_FICTION = 'Non Fiction'
}
@Schema({
    timestamps: true
})
export class Book extends Document {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    author: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: String, enum: Category, required: true })
    category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
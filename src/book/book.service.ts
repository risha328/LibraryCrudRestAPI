import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import mongoose from 'mongoose';


@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
    ) {}

    async findAll(): Promise<Book[]> {
        const books = await this.bookModel.find();
        return books;
    }
    async create(book: CreateBookDto): Promise<Book> {
        const newBook = await this.bookModel.create(book);
        return newBook;
    }

    async findById(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async updateById(id: string, book: UpdateBookDto): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, { new: true, runValidators: true });
        if (!updatedBook) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return updatedBook;
    }


    async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
    
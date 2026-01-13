import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksDto } from './dto/get-books.dto';
import mongoose from 'mongoose';

export interface PaginatedBooks {
  data: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
    ) {}

    async findAll(options: GetBooksDto): Promise<PaginatedBooks> {
        const { page = 1, limit = 10, search } = options;
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } },
                ],
            };
        }

        const total = await this.bookModel.countDocuments(query);
        const books = await this.bookModel.find(query).skip(skip).limit(limit);

        return {
            data: books,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
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
    
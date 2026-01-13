import { Body, Controller, Query } from '@nestjs/common';
import { BookService, PaginatedBooks } from './book.service';
import { Get } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Param , Put, Delete} from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksDto } from './dto/get-books.dto';



@Controller('book')
export class BookController {

    constructor(private bookService: BookService) {}

    @Get()
    async findAll(@Query() query: GetBooksDto): Promise<PaginatedBooks> {
        return this.bookService.findAll(query);

    }
 @Post('create')
   async createBook(
    @Body() 
    book: CreateBookDto
): Promise<Book> {
        return this.bookService.create(book);
    }

     @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }


  @Put(':id')
    async updateById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}

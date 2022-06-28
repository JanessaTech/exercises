package com.mysql.jpa.example.specificationusage.controller;

import com.mysql.jpa.example.specificationusage.dao.Book;
import com.mysql.jpa.example.specificationusage.service.BookService;
import com.mysql.jpa.example.specificationusage.vo.BookVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class BookController {
    @Autowired
    //@Qualifier(value = "bookServiceImpl")  // this line enables BookServiceImpl which will call BookRepositoryImpl.findBooksByAuthorNameAndTitle
    @Qualifier(value = "bookServiceImpl1")  // this line enables BookServiceImpl1 which will call BookServiceImpl1.findBooksByAuthorNameAndTitle
    private BookService bookService;

    @GetMapping
    List<BookVo> getBooks(@RequestParam(value = "title", required = false) String title, @RequestParam(value = "author", required = false) String author) {

        List<Book> books = bookService.findBooksByAuthorNameAndTitle(author, title);

        return books.stream().map(this::toVo).collect(Collectors.toList());
    }

    private BookVo toVo(Book book) {
        BookVo bookVo = new BookVo();
        bookVo.setId(book.getId());
        bookVo.setTitle(book.getTitle());
        bookVo.setAuthor(book.getAuthor());
        return bookVo;
    }
}

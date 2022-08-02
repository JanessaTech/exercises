package com.example.asynaop.controller;

import com.example.asynaop.service.AsynUploadService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AsynUploadController {

    @Autowired
    AsynUploadService asynUploadService;

    @PostMapping("/upload/{file}")
    public String handleFile(@PathVariable(name = "file", required = true)  String fileName) {
        log.info("Thread {} starts running in AsynUploadController for file {}", Thread.currentThread().getName(), fileName);
        String res = asynUploadService.doBusiness(fileName);

        log.info("Thread {} finishes running in AsynUploadController for file {}", Thread.currentThread().getName(), fileName);

        return res;
    }
}

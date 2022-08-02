package com.example.asynaop.service;

import com.example.asynaop.annotation.Upload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

public interface AsynUploadService {
    String doBusiness(String file);
}

@Service
@Slf4j
class AsynUploadServiceImpl implements AsynUploadService {

    @Override
    @Upload
    public String doBusiness(String file) {
        log.info("Do some business for file {}", file);
        /**
         * Do your business
         */
        return "success";
    }
}

package com.example.consumer2.consumer;

import com.example.common.model.MyBusinessMessage;
import com.example.common.model.Student;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

public interface StudentConsumer {
    void handleMessage(MyBusinessMessage message);
}

@Slf4j
@Service
class StudentMessageConsumerImpl extends AbstractMessageConsumer implements StudentConsumer {

    @Override
    public void handleMessage(MyBusinessMessage message) {

        Student student = (Student) message.getParams().get("stu");
        log.info("Received student:" + student);
    }
}

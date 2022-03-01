package com.example.producer2.config;

import com.example.common.model.MyBusinessMessage;
import com.example.common.model.Student;
import org.springframework.stereotype.Component;

public interface StudentMessageProducer {
    void sendMessage(Student student);
}

@Component
class StudentMessageProducerImp extends AbstractJmsProducerImpl implements StudentMessageProducer {

    @Override
    public void sendMessage(Student student) {
        MyBusinessMessage message = new MyBusinessMessage();
        message.setMessage("stu", student);
        send(message);
    }

    @Override
    String getProducerName() {
        return "studentMessage";
    }
}

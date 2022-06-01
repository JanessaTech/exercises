package com.mysql.jpa.example.onemany.service;

import com.mysql.jpa.example.onemany.dao.Tutorial;

import java.util.List;

public interface TutorialService {
    Tutorial create(Tutorial tutorial);
    Tutorial update(Tutorial tutorial);
    List<Tutorial> getAll();
    Tutorial getById(Long id) throws Exception;
    void delete(Long id);
}

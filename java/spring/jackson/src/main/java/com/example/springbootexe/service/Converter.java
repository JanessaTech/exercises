package com.example.springbootexe.service;

import com.example.springbootexe.dto.PlayerVouchersResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class Converter {
    ObjectMapper objectMapper = new ObjectMapper();

    public PlayerVouchersResponse convertToObject(String json) throws JsonProcessingException {
        PlayerVouchersResponse response = objectMapper.readValue(json, PlayerVouchersResponse.class);
        return response;
    }

    public String convertToStr(PlayerVouchersResponse obj) throws JsonProcessingException {
        String jsonString = objectMapper.writeValueAsString(obj);
        return jsonString;
    }

}

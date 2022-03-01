package com.example.springbootexe.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PaginationResponse {
    private long count;
    private int size;
    private int currentPage;
    private int pageCount;

    public int getCurrentPage() {
        return this.currentPage == 0 ? this.currentPage : this.currentPage - 1;
    }
}

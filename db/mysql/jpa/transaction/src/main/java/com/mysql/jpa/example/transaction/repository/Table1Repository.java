package com.mysql.jpa.example.transaction.repository;

import com.mysql.jpa.example.transaction.dao.Table1;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Table1Repository extends JpaRepository<Table1, Long> {
}

package com.example.transaction.plain;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * reference : https://en.wikipedia.org/wiki/Java_Database_Connectivity
 */
public class MySQLDemo {
    static String URL = "jdbc:mysql://192.168.1.107:3306/mydb?useSSL=false";

    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(URL, "mysqluser", "mysqluser");
            Statement stmt = conn.createStatement();
            String sql = "INSERT INTO employee(name, age) VALUES ('john', 32)";
            stmt.executeUpdate(sql);
            System.out.println("Inserted records into the table...");
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}

package com.example.transaction.plain;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class MysqlPlainSuccess {
    static String URL = "jdbc:mysql://192.168.1.107:3306/mydb?useSSL=false";

    public static void main(String[] args) throws SQLException {
        Connection conn  = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(URL, "mysqluser", "mysqluser");
            conn.setAutoCommit(false);
            Statement stmt = conn.createStatement();
            String sql = "INSERT INTO employee(name, age) VALUES ('Jane', 20)";
            stmt.executeUpdate(sql);
            conn.commit();
            System.out.println("Inserted records into the table...");
        } catch (ClassNotFoundException | SQLException e) {
            conn.rollback();
            e.printStackTrace();
        }

    }
}

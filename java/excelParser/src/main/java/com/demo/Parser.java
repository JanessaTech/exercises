package com.demo;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

public class Parser {
    public static void main(String[] args) {
        String fileName = "role_groups1.xlsx";

            ClassLoader classloader = Thread.currentThread().getContextClassLoader();
            InputStream inputFile = classloader.getResourceAsStream(fileName);
        try {
            XSSFWorkbook wb = new XSSFWorkbook(inputFile);
            XSSFSheet sheet = wb.getSheetAt(0);
            int rowCnt = sheet.getLastRowNum();
            if (rowCnt == 0) {
                System.out.println(fileName + " is empty. return");
                return;
            }
            Row header = sheet.getRow(0);
            int columnCnt = header.getPhysicalNumberOfCells();
            System.out.println("rowCnt = " + rowCnt);
            System.out.println("columnCnt = " + columnCnt);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                Cell roleGroupName = row.getCell(0);
                Cell description = row.getCell(1);
                Cell roles = row.getCell(2);
                if (roleGroupName.getCellType() == 0 ) {
                    System.out.println("roleGroupName is numeric");
                }
                System.out.println("roleGroupName = " + (roleGroupName == null ? "null" : roleGroupName.getStringCellValue()));
                System.out.println("description = " + (description == null ? "null" : description.getStringCellValue()));
                System.out.println("roles = " + (roles == null ? "null" : roles.getStringCellValue()));
            }
            } catch (IOException e) {
            e.printStackTrace();
        }


    }
}

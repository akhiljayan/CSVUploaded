/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.rakuten.fullstackrecruitmenttest.services;

import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author AkhilJayan
 */
public interface EmployeeService {
    
    String uploadFileToFactory(MultipartFile file);   
    
    String editEmployeeRecord(InputStream input, Integer page) throws IOException;
    
    String getEmployeeRecordsPagination(Integer page);
    
    Response downloadAllEmployeeRecords(HttpServletResponse response);
    
    Response downloadAllErrorEmployeeRecords(HttpServletResponse response);

}

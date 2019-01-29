package com.rakuten.fullstackrecruitmenttest;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.rakuten.fullstackrecruitmenttest.model.Employee;
import com.rakuten.fullstackrecruitmenttest.model.PagedEmployeeDao;
import com.rakuten.fullstackrecruitmenttest.services.EmployeeService;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FullStackRecruitmentTestApplicationTests {

    @Autowired
    public EmployeeService _service;

    @Test
    public void contextLoads() {
    }

    @Test
    public void Should_Upload_Csv_File_And_Return_Json() throws FileNotFoundException, IOException {
        String location = System.getProperty("user.dir") + "\\test.csv";
        File file = new File(location);

        Path path = file.toPath();
        String mimeType = Files.probeContentType(path);
        FileInputStream input = new FileInputStream(file);
        MultipartFile multipartFile = new MockMultipartFile("test.csv", "test.csv", mimeType, input);
        String jsonOutput = _service.uploadFileToFactory(multipartFile);
        System.out.println(jsonOutput);
        Gson gson = new Gson();
        PagedEmployeeDao output = gson.fromJson(jsonOutput, PagedEmployeeDao.class);

        assertEquals(output.Employees.size(), 10);
    }

}

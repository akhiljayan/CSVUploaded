package com.rakuten.fullstackrecruitmenttest.controller;

import com.google.gson.Gson;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameTranslateMappingStrategy;
import com.rakuten.model.Employee;
import com.rakuten.model.PagedEmployeeDao;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import static java.util.Arrays.sort;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class MainController {

    @GetMapping("/test")
    @CrossOrigin(origins = "*")
    public String testMethod() {
        return "test";
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadMethod(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        Gson gson = new Gson();
        if (!"csv".equals(file.getOriginalFilename().substring(file.getOriginalFilename().length() - 3))) {
            redirectAttributes.addFlashAttribute("message", "Invalid file format");
            return "redirect:uploadStatus";
        }

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "No File is Present");
            return "redirect:uploadStatus";
        }

        try {
            List<Employee> emps = parseCSVFileLineByLine(file.getInputStream());
            StoreInFactory(emps);

            PagedEmployeeDao pagedEmp = getPages(emps, 10, 1);

            String json = gson.toJson(pagedEmp);
            return json;
        } catch (IOException e) {
            redirectAttributes.addFlashAttribute("message", "Invalid request");
            return "redirect:uploadStatus";
        }
    }

    @GetMapping("/employees/{page}")
    public String getPagedEmployees(@PathVariable Integer page) {
        Gson gson = new Gson();
        SingleonClass factory = SingleonClass.getInstance();
        List<Employee> emps = factory.getAllEmployees();
        PagedEmployeeDao pagedEmp = getPages(emps, 10, page);
        String json = gson.toJson(pagedEmp);
        return json;
    }

    private List<Employee> parseCSVFileLineByLine(InputStream inputStream) {
        HeaderColumnNameTranslateMappingStrategy<Employee> beanStrategy = new HeaderColumnNameTranslateMappingStrategy<>();
        beanStrategy.setType(Employee.class);

        Map<String, String> columnMapping = new HashMap<>();
        columnMapping.put("name", "Name");
        columnMapping.put("department", "Department");
        columnMapping.put("designation", "Designation");
        columnMapping.put("salary", "Salary");
        columnMapping.put("joining date", "JoiningDate");

        beanStrategy.setColumnMapping(columnMapping);

        CsvToBean<Employee> csvToBean = new CsvToBean<>();
        CSVReader reader = new CSVReader(new InputStreamReader(inputStream));

        List<Employee> emps = csvToBean.parse(beanStrategy, reader);
        int initialId = 1;
        for (Employee emp : emps) {
            emp.setId(initialId);
            emp.validateObject();
            initialId++;
        }

        return emps;
    }

    private void StoreInFactory(List<Employee> emps) {
        SingleonClass factory = SingleonClass.getInstance();
        factory.replaceEmployee(emps);
    }

    private PagedEmployeeDao getPages(Collection<Employee> c, Integer pageSize, Integer currentPage) {
        if (c == null) {
            return new PagedEmployeeDao();
        }
        Integer totalCount = c.size();
        List<Employee> list = new ArrayList<>(c);
        if (pageSize == null || pageSize <= 0 || pageSize > list.size()) {
            pageSize = list.size();
        }
        int numPages = (int) Math.ceil((double) list.size() / (double) pageSize);
        List<List<Employee>> pages = new ArrayList<>(numPages);
        for (int pageNum = 0; pageNum < numPages;) {
            pages.add(list.subList(pageNum * pageSize, Math.min(++pageNum * pageSize, list.size())));
        }
        List<Employee> pagedEmployees = pages.get(currentPage - 1);
        Integer numberOfPages = pages.size();

        PagedEmployeeDao dao = new PagedEmployeeDao(pagedEmployees, currentPage, pageSize, totalCount, numberOfPages);

        return dao;
    }

}

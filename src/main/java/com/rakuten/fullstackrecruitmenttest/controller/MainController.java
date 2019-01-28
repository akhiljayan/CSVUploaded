package com.rakuten.fullstackrecruitmenttest.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameTranslateMappingStrategy;
import com.rakuten.model.Employee;
import com.rakuten.model.PagedEmployeeDao;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import static java.util.Arrays.sort;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
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

    @RequestMapping(value = "/edit/{page}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String editRecord(InputStream input, @PathVariable Integer page) throws IOException {
        Gson gson = new Gson();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> jsonMap = mapper.readValue(input, Map.class);

        SingleonClass factory = SingleonClass.getInstance();
        List<Employee> emps = factory.getAllEmployees();

        Employee emp = emps.stream().filter(e -> jsonMap.get("Id").equals(e.getId())).findFirst().orElse(null);
        emp.setName((String) jsonMap.get("Name"));
        emp.setDepartment((String) jsonMap.get("Department"));
        emp.setDesignation((String) jsonMap.get("Designation"));
        emp.setSalary((String) jsonMap.get("Salary"));
        emp.setJoiningDate((String) jsonMap.get("JoiningDate"));
        emp.validateObject();

        PagedEmployeeDao pagedEmp = getPages(emps, 10, page);
        String json = gson.toJson(pagedEmp);
        return json;
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

    @GetMapping("/downloaAllCsv")
    public Response downloadAllList(@Context HttpServletResponse response) {
        SingleonClass factory = SingleonClass.getInstance();
        List<Employee> emps = factory.getAllEmployees();
        String fileName = "employees_"+System.currentTimeMillis()+".csv";
        
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        response.setContentType("text/csv");   
        writeListToCSV(emps,fileName);
        return Response.ok().build();
    }
    
    @GetMapping("/downloaErrorCsv")
    public Response downloadErrorList(@Context HttpServletResponse response) {
        SingleonClass factory = SingleonClass.getInstance();
        List<Employee> emps = factory.getAllEmployees();
        
        List<Employee> emp = emps.stream().filter(e -> e.getHasError()).collect(Collectors.toList());
        
        
        String fileName = "employees_Error_"+System.currentTimeMillis()+".csv";
        
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        response.setContentType("text/csv");   
        writeListToCSV(emps,fileName);
        return Response.ok().build();
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

    private void writeListToCSV(List<Employee> empList, String filename) {
        String CSV_SEPARATOR = ",";
        try {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filename), "UTF-8"));
            bw.write("name,department,designation,salary,joining date");
            bw.newLine();
            for (Employee emp : empList) {
                StringBuilder oneLine = new StringBuilder();
                oneLine.append(emp.getName().trim().length() == 0 ? "" : emp.getName());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(emp.getDepartment().trim().length() == 0 ? "" : emp.getDepartment());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(emp.getDesignation().trim().length() == 0 ? "" : emp.getDesignation());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(emp.getSalary().trim().length() == 0 ? "" : emp.getSalary());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(emp.getJoiningDate().trim().length() == 0 ? "" : emp.getJoiningDate());
                bw.write(oneLine.toString());
                bw.newLine();
            }
            bw.flush();
            bw.close();
            
        } catch (UnsupportedEncodingException e) {
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
    }

}

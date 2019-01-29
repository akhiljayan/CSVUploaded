/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.rakuten.fullstackrecruitmenttest.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author AkhilJayan
 */
public class Employee {

    public int Id;
    public String Name;
    public String Department;
    public String Designation;
    public String Salary;
    public String JoiningDate;
    public Boolean HasError;
    public ArrayList<String> ErrorMessage;

    public Employee() {
        ErrorMessage = new ArrayList<>();
        HasError = false;
    }

    public int getId() {
        return Id;
    }

    public void setId(int Id) {
        this.Id = Id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getDepartment() {
        return Department;
    }

    public void setDepartment(String Department) {
        this.Department = Department;
    }

    public String getDesignation() {
        return Designation;
    }

    public void setDesignation(String Designation) {
        this.Designation = Designation;
    }

    public String getSalary() {
        return Salary;
    }

    public void setSalary(String Salary) {
        this.Salary = Salary;
    }

    public String getJoiningDate() {
        return JoiningDate;
    }

    public void setJoiningDate(String JoiningDate) {
        this.JoiningDate = JoiningDate;
    }

    public Boolean getHasError() {
        return HasError;
    }

    public void setHasError(Boolean HasError) {
        this.HasError = HasError;
    }

    public ArrayList<String> getErrorMessage() {
        return ErrorMessage;
    }

    public void setErrorMessage(ArrayList<String> ErrorMessage) {
        this.ErrorMessage = ErrorMessage;
    }


    public Employee validateObject() {
        int errorCount = 0;
        int designationError = 0;
        int dateError = 0;
        if (!(this.Name.matches("[a-zA-Z ]+"))) {
            errorCount++;
            ErrorMessage.add("Name");
        }else{
            if(ErrorMessage.contains("Name")){
                ErrorMessage.remove("Name");
            }
        }

        if (!(this.Department.matches("[a-zA-Z0-9-_* ]+"))) {
            errorCount++;
            ErrorMessage.add("Department");
        }else{
            if(ErrorMessage.contains("Department")){
                ErrorMessage.remove("Department");
            }
        }

        try {
            String processedDesignationString = this.Designation.replaceAll("\\s+", "").toLowerCase();
            designation.valueOf(processedDesignationString);
        } catch (Exception e) {
            errorCount++;
            designationError++;
            ErrorMessage.add("Designation");
        }

        if (!(this.Salary.matches("[0-9]+"))) {
            errorCount++;
            ErrorMessage.add("Salary");
        }else{
            if(ErrorMessage.contains("Salary")){
                ErrorMessage.remove("Salary");
            }
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        try {
            dateFormat.parse(this.JoiningDate.trim());
        } catch (ParseException e) {
            errorCount++;
            dateError++;
            ErrorMessage.add("JoiningDate");
        }
        
        if(designationError == 0 && ErrorMessage.contains("Designation")){
            ErrorMessage.remove("Designation");
        }
        if(dateError == 0 && ErrorMessage.contains("JoiningDate")){
            ErrorMessage.remove("JoiningDate");
        }
        
        HasError = errorCount > 0;

        return this;
    }
    
    

}

enum designation {
    developer,
    seniordeveloper,
    manager,
    teamlead,
    vp,
    ceo
};

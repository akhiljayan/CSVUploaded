/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.rakuten.model;

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
        if (!(this.Name.matches("[a-zA-Z ]+"))) {
            this.HasError = true;
            ErrorMessage.add("Name");
        }

        if (!(this.Department.matches("[a-zA-Z0-9-_* ]+"))) {
            this.HasError = true;
            ErrorMessage.add("Department");
        }

        try {
            String processedDesignationString = this.Designation.replaceAll("\\s+", "").toLowerCase();
            designation.valueOf(processedDesignationString);
        } catch (Exception e) {
            this.HasError = true;
            ErrorMessage.add("Designation");
        }

        if (!(this.Salary.matches("[0-9]+"))) {
            this.HasError = true;
            ErrorMessage.add("Salary");
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        try {
            dateFormat.parse(this.JoiningDate.trim());
        } catch (ParseException e) {
            this.HasError = true;
            ErrorMessage.add("JoiningDate");
        }

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

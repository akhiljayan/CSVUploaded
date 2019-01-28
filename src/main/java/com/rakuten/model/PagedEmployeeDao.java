/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.rakuten.model;

import java.util.Collections;
import java.util.List;

/**
 *
 * @author AkhilJayan
 */
public class PagedEmployeeDao {
    public List<Employee> Employees;
    public Integer CurrentPage;
    public Integer PageSize;
    public Integer TotalCount;
    public Integer TotalPages;
    
    public PagedEmployeeDao(){
        this.Employees = Collections.emptyList();
    }
    public PagedEmployeeDao(List<Employee> Employees, Integer CurrentPage, Integer PageSize, Integer TotalCount, Integer TotalPages){
        this.Employees = Employees;
        this.CurrentPage = CurrentPage;
        this.PageSize = PageSize;
        this.TotalCount = TotalCount;
        this.TotalPages = TotalPages;
    }

    public List<Employee> getEmployees() {
        return Employees;
    }

    public void setEmployees(List<Employee> Employees) {
        this.Employees = Employees;
    }

    public Integer getCurrentPage() {
        return CurrentPage;
    }

    public void setCurrentPage(Integer CurrentPage) {
        this.CurrentPage = CurrentPage;
    }

    public Integer getPageSize() {
        return PageSize;
    }

    public void setPageSize(Integer PageSize) {
        this.PageSize = PageSize;
    }

    public Integer getTotalCount() {
        return TotalCount;
    }

    public void setTotalCount(Integer TotalCount) {
        this.TotalCount = TotalCount;
    }

    public Integer getTotalPages() {
        return TotalPages;
    }

    public void setTotalPages(Integer TotalPages) {
        this.TotalPages = TotalPages;
    }
    
}



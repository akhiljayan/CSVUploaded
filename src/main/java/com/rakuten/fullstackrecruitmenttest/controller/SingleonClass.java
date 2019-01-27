/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.rakuten.fullstackrecruitmenttest.controller;

import com.rakuten.model.Employee;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author AkhilJayan
 */
public class SingleonClass {

    private static SingleonClass singleton = new SingleonClass();
    
    private List<Employee> employees= new ArrayList<>();

    private SingleonClass() {
    }

    public static SingleonClass getInstance() {
        return singleton;
    }

    protected void replaceEmployee(List<Employee> emp) {
        System.out.println("demoMethod for singleton");
        employees = null;
        this.employees = emp;
    }
}

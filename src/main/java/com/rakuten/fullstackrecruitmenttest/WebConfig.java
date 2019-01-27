/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.rakuten.fullstackrecruitmenttest;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 *
 * @author AkhilJayan
 */
@Configuration
@EnableWebMvc
public class WebConfig {
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}

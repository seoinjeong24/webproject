package com.example.loginproject.controller;

import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @PostConstruct
    public void init() {
        System.out.println("HealthCheckController is initialized");
    }

    @GetMapping("/health")
    public String health() {
        System.out.println("/health endpoint hit");
        return "OK";
    }
}

package com.example.loginproject;

import com.example.loginproject.controller.HealthCheckController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LoginprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginprojectApplication.class, args);
	}

	@Bean
	public HealthCheckController healthCheckController() {
		return new HealthCheckController();
	}
}

package com.example.loginproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())

                // ✅ 로그인, 로그아웃 완전 제거
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable())

                // 회원가입 관련 경로만 열기
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/signup.html",
                                "/css/**",
                                "/js/**",
                                "/register"
                        ).permitAll()
                        .anyRequest().permitAll()
                )
                .build();
    }
}

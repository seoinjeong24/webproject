package com.example.loginproject.controller;

import com.example.loginproject.domain.User;
import com.example.loginproject.repository.UserRepository;
import com.example.loginproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository; //추가
    private final PasswordEncoder passwordEncoder; //추가

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String userId,
                                           @RequestParam String username,
                                           @RequestParam String password) {
        String result = userService.register(userId, username, password);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String userId,
                                   @RequestParam String password) {
        Optional<User> optionalUser = userRepository.findByUserId(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                Map<String, String> result = new HashMap<>();
                result.put("username", user.getUsername());
                result.put("userId", user.getUserId());
                return ResponseEntity.ok(result); //JSON 반환
            }
        }
        return ResponseEntity.status(401).body("아이디 또는 비밀번호가 틀렸습니다.");
    }
}

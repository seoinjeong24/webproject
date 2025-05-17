package com.example.loginproject.service;

import com.example.loginproject.domain.User;
import com.example.loginproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(String userId, String username, String rawPassword) {
        if (userRepository.existsByUserId(userId)) {
            return "이미 존재하는 아이디입니다.";
        }

        User user = new User();
        user.setUserId(userId);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));

        userRepository.save(user);
        return "회원가입 성공!";
    }

    public boolean login(String userId, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByUserId(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }
        return false;
    }

}

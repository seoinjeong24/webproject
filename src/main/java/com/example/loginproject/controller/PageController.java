package com.example.loginproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/")
    public String root() {
        return "redirect:/index.html";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    @GetMapping("/map")
    public String map() {
        return "map";
    }

    @GetMapping("/add")
    public String add() {
        return "add";
    }

    @GetMapping("/ambient")
    public String ambient() {
        return "ambient";
    }

    @GetMapping("/expiring")
    public String expiring() {
        return "expiring";
    }

    @GetMapping("/freeze")
    public String freeze() {
        return "freeze";
    }

    @GetMapping("/fridge")
    public String fridge() {
        return "fridge";
    }

    @GetMapping("/bookmarks")
    public String bookmarks() {
        return "bookmarks";
    }

    @GetMapping("/listall")
    public String listall() {
        return "listall";
    }

    @GetMapping("/managing")
    public String managing() {
        return "managing";
    }

}

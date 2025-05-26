package com.example.loginproject.controller;

import org.springframework.http.ResponseEntity;
import com.example.loginproject.domain.Item;
import com.example.loginproject.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/freeze")
    public String freeze(Model model) {
        model.addAttribute("items", itemService.findByCategory("freeze"));
        return "freeze";
    }

    @GetMapping("/fridge")
    public String fridge(Model model) {
        model.addAttribute("items", itemService.findByCategory("fridge"));
        return "fridge";
    }

    @GetMapping("/expiring")
    public String expiring(Model model) {
        model.addAttribute("items", itemService.findByCategory("expiring"));
        return "expiring";
    }

    @PostMapping("/items")
    public String addItem(@RequestParam String name,
                          @RequestParam String category,
                          @RequestParam String expiryDate) {
        Item item = new Item(null, name, category, expiryDate);
        itemService.save(item);
        return "redirect:/" + category;
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<String> addItemJson(@RequestBody Item item) {
        itemService.save(item);
        return ResponseEntity.ok("OK");
    }

}

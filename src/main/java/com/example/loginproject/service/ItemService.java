package com.example.loginproject.service;

import com.example.loginproject.domain.Item;
import com.example.loginproject.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public void save(Item item) {
        itemRepository.save(item);
    }

    public List<Item> findByCategory(String category) {
        return itemRepository.findByCategory(category);
    }
}

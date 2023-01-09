package com.sparta.week04.controller;

import com.sparta.week04.models.Product;
import com.sparta.week04.models.ProductMypriceRequestDto;
import com.sparta.week04.models.ProductRepository;
import com.sparta.week04.models.ProductRequestDto;
import com.sparta.week04.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProductRestController {
    private final ProductRepository productRepository;
    private final ProductService productService;

    @PostMapping("/api/products")
    public Product createProduct(@RequestBody ProductRequestDto requestDto){
        Product product = new Product(requestDto);

        return productRepository.save(product);
    }

    @GetMapping("/api/products")
    public List<Product> readProducts() {

        return productRepository.findAll();
    }

    @PutMapping("/api/products/{id}")
    public Long updateProducts(@PathVariable Long id, @RequestBody ProductMypriceRequestDto requestDto){
        productService.update(id, requestDto);
        return id;
    }

}

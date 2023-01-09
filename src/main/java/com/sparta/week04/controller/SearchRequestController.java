package com.sparta.week04.controller;

import com.sparta.week04.models.ItemDto;
import com.sparta.week04.utils.NaverShopSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SearchRequestController {
    //NaverShopSearch 객체를 @Component(컴포넌트 등록)를 사용하여 스프링이 자동으로 사용가능
    private final NaverShopSearch naverShopSearch;

    @GetMapping("/api/search") //주소
    //Naver GET방식 요청에 필요한 query라는 파라미터를 getItems 메소드의 파라미터로 지정
    //사용자의 입력 값을 변수로 받고싶을 때 = 주소뒤에 붙는 값들이 필요할 때 사용
    //네이버가 지정한 파라미터명과 반드시 똑같아야함
    public List<ItemDto> getItems(@RequestParam String query) {
        //search()메소드로 해당 키워드 검색
        String result = naverShopSearch.search(query);
        //검색한 결과를 반환
        return naverShopSearch.fromJSONtoItems(result);
    }
}

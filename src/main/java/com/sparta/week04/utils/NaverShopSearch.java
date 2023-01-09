package com.sparta.week04.utils;

import com.sparta.week04.models.ItemDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component //컴포넌트 등록 -> 스프링이 권한을 획득해서 이 객체를 자동으로 사용가능
public class NaverShopSearch {
    public String search(String query) {
        //ARC에서 스프링으로 동작하는 코드를 가져온 것
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Naver-Client-Id", "DjkoS3unbRHoBuQD1QYl");
        headers.add("X-Naver-Client-Secret", "A1nLRr1sH8");
        String body = "";

        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);
        ResponseEntity<String> responseEntity = rest.exchange("https://openapi.naver.com/v1/search/shop.json?query=" + query, HttpMethod.GET, requestEntity, String.class);
        HttpStatus httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value();
        String response = responseEntity.getBody();
        System.out.println("Response status: " + status);
        System.out.println(response);

        return response;
    }

    //전달받은 문자열을 JSONObject으로 변환 -> ItemDto에 검색결과 전달
    //-> itemDtoList에 itemDto값 저장
    public List<ItemDto> fromJSONtoItems(String result) {
        //문자열 -> JSONObject
        JSONObject rjson = new JSONObject(result);
        //JSONArray에서 items 배열 꺼내기
        JSONArray items = rjson.getJSONArray("items");

        List<ItemDto> itemDtoList = new ArrayList<>();
        //JSONArray를 for문으로 돌리고 JSONObject 형태로 itemJson 변수에 대입
        for (int i = 0; i < items.length(); i++) {
            JSONObject itemJson = (JSONObject) items.get(i); //items.getJSONObject(i);
            ItemDto itemDto = new ItemDto(itemJson);
            itemDtoList.add(itemDto); //검색 결과는 여러 개가 나오므로 리스트에 itemDto 값 추가
        }
        return itemDtoList;
    }
}
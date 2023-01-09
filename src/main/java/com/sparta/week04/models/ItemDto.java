package com.sparta.week04.models;

import lombok.Getter;
import org.json.JSONObject;

@Getter
public class ItemDto {
    private String title;
    private String image;
    private String link;
    private int lprice;

    public ItemDto(JSONObject jsonObject) {

        //JSONObject의 값읋 가져오는 방법
        this.title = jsonObject.getString("title");
        this.image = jsonObject.getString("image");
        this.link = jsonObject.getString("link");
        this.lprice = jsonObject.getInt("lprice");
    }
}

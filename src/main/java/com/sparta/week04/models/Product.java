package com.sparta.week04.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Product extends Timestamped{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String link;

    @Column(nullable = false)
    private int lprice;

    @Column(nullable = false)
    private int myprice;

    public Product(ProductRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.image = requestDto.getImage();
        this.link = requestDto.getLink();
        this.lprice = requestDto.getLprice();
        this.myprice = 0; //최저가 가격 설정을 안 하면 관심 상품 등록이 안되게 하기 위해서 0으로 설정
    }

    public void update(ProductMypriceRequestDto requestDto) {

        this.myprice = requestDto.getMyprice();
    }


    public void updateBySearch(ItemDto itemDto) {
        this.lprice = itemDto.getLprice();
    }
}

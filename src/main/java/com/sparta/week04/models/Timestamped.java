package com.sparta.week04.models;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

//값을 가져온다
@Getter
// 해당 추상 클래스를 상속할 경우 이 클래스의 변수를 컬럼으로 인식(매핑 시킨다)
@MappedSuperclass
// 해당 클래스에 Auditing(감시) 기능을 포함 -> 생성, 수정이 발생하면 감지
@EntityListeners(AuditingEntityListener.class) //
public abstract class Timestamped {

    @CreatedDate //생성일자
    private LocalDateTime createdAt;

    @LastModifiedDate //수정일자
    private LocalDateTime modifiedAt;
}

package liveStreaming.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
//전체를 포함하는 생성자 member 변수
@AllArgsConstructor

//기본 생성자
@NoArgsConstructor
public class VideoRecordDto {
    String v_code;
	String v_name;
	String v_img;
	String c_code;
	int v_length;
	Date v_date;
	String u_id;
	int v_views;
	String v_link;
}
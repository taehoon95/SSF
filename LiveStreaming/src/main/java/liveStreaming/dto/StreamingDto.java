package liveStreaming.dto;



import java.util.Date;

import org.joda.time.DateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 2021 1123 이태훈
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class StreamingDto {
	String l_code;
	String l_title;
	String l_description;
	String u_id;
	Date l_date;
	String l_img;
}

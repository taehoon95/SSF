package liveStreaming.dto;

import java.util.Date;

import org.joda.time.DateTime;

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
public class UserDto {
	String token;
	String u_id;
	String u_pwd;
	String u_name;
	String u_gender;
	String u_email;
	String u_tell;
	Date u_birth;
}

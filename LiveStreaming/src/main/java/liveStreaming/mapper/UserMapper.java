package liveStreaming.mapper;

import org.springframework.stereotype.Repository;

import liveStreaming.dto.UserDto;

@Repository
public interface UserMapper {
	// 2021 1116 이태훈
	// 로그인
	UserDto loginUser(UserDto user);

	// 2021 1118 강동하
	// 회원가입
	int registerUser(UserDto user);

	// 2021 1116 박진현
	// 아이디 체크
	UserDto checkUser(UserDto user);

	// 2021 1123 박진현
	// 아이디 찾기
	UserDto idfind(UserDto user);

	//2021 1124 박진현
	// 비밀번호 찾기
	UserDto pwdFind(UserDto user);

	//비밀번호 변경
	int pwdupdate(UserDto user);


}

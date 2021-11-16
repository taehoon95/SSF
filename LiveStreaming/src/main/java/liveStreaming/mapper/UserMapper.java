package liveStreaming.mapper;

import liveStreaming.dto.UserDto;

public interface UserMapper {
	// 2021 1116 이태훈

	// 로그인
	UserDto loginUser(UserDto user);
	
	// 회원가입 
    int register(UserDto user); 
}

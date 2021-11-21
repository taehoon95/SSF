package liveStreaming.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import liveStreaming.dto.UserDto;

import liveStreaming.mapper.UserMapper;


// transaction : 비즈니스 로직
// 비즈니스 로직 처리중 에러가 발생시 그시점에서 로직을 멈추고 데이터 롤백
@Service
public class UserService {

	//jpa 에서는 레포지토리
	//mapper 폴더안에있는 usermapper에 해당한다.
	@Autowired
	UserMapper mapper;
	//회원가입 서비스
	// 회원가입 있는 아이디 체크 여부 확인 후 생성
	//비지니스 로직 webservice
	public UserDto create(final UserDto user){
		if(user == null || user.getU_id() == null){
			throw new RuntimeException("모르겠다");
		}
		if(mapper.checkUser(user) != null){
			throw new RuntimeException("아이디 이미 있다.");
		}
		mapper.registerUser(user);
		return user;
	}

	public UserDto getByCredentials(UserDto user){
		return mapper.loginUser(user);
	}
}

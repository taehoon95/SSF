package liveStreaming.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import liveStreaming.dto.UserDto;
import liveStreaming.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;

// transaction : 비즈니스 로직
// 비즈니스 로직 처리중 에러가 발생시 그시점에서 로직을 멈추고 데이터 롤백
@Slf4j
@Service
public class UserService {

	// jpa 에서는 레포지토리
	// mapper 폴더안에있는 usermapper에 해당한다.
	@Autowired
	UserMapper mapper;

	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();



	// 회원가입 서비스
	// 회원가입 있는 아이디 체크 여부 확인 후 생성
	// 비지니스 로직 webservice
	public UserDto create(final UserDto user) {
		if (user == null || user.getU_id() == null) {
			throw new RuntimeException("모르겠다");
		}
		if (mapper.checkUser(user) != null) {
			throw new RuntimeException("아이디 이미 있다.");
		}
		mapper.registerUser(user);
		return user;
	}

	public UserDto id_chcek(UserDto user) {
		if (mapper.checkUser(user) != null) {
			throw new RuntimeException("ID 중복");
		}
		// 중복 체크 통과
		return user;
	}


	public UserDto getByCredentials(final UserDto user, final PasswordEncoder encoder) {
		final UserDto originalUser = mapper.pwdidcheck(user);
		System.out.println(user);
		System.out.println(originalUser);
//		PasswordEncoder A = user.getU_pwd();
//		PasswordEncoder B = originalUser.getU_pwd());
		System.out.println(user.getU_pwd());
		System.out.println(originalUser.getU_pwd());
		
		System.out.println(encoder.matches(user.getU_pwd(),originalUser.getU_pwd()));
		if (originalUser != null && encoder.matches(user.getU_pwd(),originalUser.getU_pwd())) {
			return mapper.checkUser(user);
		}
		log.info("null");
		return null;
	}


}

//2021-11-19
//controller
//박진현

package liveStreaming.controller;

import liveStreaming.dto.VideoRecordDto;
import liveStreaming.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import liveStreaming.dto.UserDto;
import liveStreaming.security.TokenProvider;
import liveStreaming.service.UserService;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	UserService service;

	@Autowired
	UserMapper mapper;

	@Autowired
	private TokenProvider tokenProvider;

	//bean으로 작성해도 됨
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	
	// 20211118 강동하 회원가입 api
	@PostMapping("/register")
	public ResponseEntity<Object> registerUser(@RequestBody UserDto user){
		System.out.println("===================");
		System.out.println(user.getU_id());
		return ResponseEntity.ok(service.create(user));
	}

	//20211120 강동하 회원가입 시 id 중복 체크
	@PostMapping("/idcheck")
	public ResponseEntity<Object> checkUser(@RequestBody UserDto user){
		System.out.println("===================");
		System.out.println(user.getU_id());
		return ResponseEntity.ok(service.id_chcek(user));
	}

	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@RequestBody UserDto user){
		 	user = service.getByCredentials(user, passwordEncoder);
		 if(user != null) {
			//토큰 생성
			 final String token = tokenProvider.create(user);
			 user.setToken(token);
			 log.info("안녕하세요");
			return ResponseEntity.ok().body(user);
		}else{
			 System.out.println("실패");
			 return ResponseEntity.badRequest().body(user);
		 }
	}
	@PostMapping("/check")
	public ResponseEntity<Object> logincheck(@RequestBody UserDto user){
		System.out.println(user);

		if(user.getToken() == null) {
			System.out.println("토큰 없다");
			return ResponseEntity.badRequest().body(user);
		}else{
			System.out.println("토큰 있따.");
			return ResponseEntity.ok().body(user);
		}
	}
	@PostMapping("/idfind")
	public List<UserDto> idfind(@RequestBody UserDto user){
		if(user == null){
			return mapper.idfind(null);
		}

		return mapper.idfind(user);
	}
	@PostMapping("/pwdfind")
	public ResponseEntity<Object> pwdFind(@RequestBody UserDto user){
		System.out.println("여기는 pwdfind");
		System.out.println(user + "1111111");
		UserDto pwdfindUser = mapper.pwdFind(user);
		if(pwdfindUser == null ){
			return ResponseEntity.badRequest().body("에러");
		}
		System.out.println("user "+user);
		System.out.println("pwdfindUser "+pwdfindUser);
		return ResponseEntity.ok(pwdfindUser);
	}
	@PatchMapping("/pwdupdate")
	public ResponseEntity<Object> pwdupdate(@RequestBody UserDto user) {

		System.out.println("여기는 비밀번호 변경이다.");
		System.out.println(user);
		int pwdupdateUser = mapper.pwdupdate(user);
		System.out.println(pwdupdateUser);
		return ResponseEntity.ok(pwdupdateUser);
	}
	//비밀번호 찾기 페이지 아이디 여부 확인
	@PostMapping("/pwdidcheck")
	public ResponseEntity<Object> pwdidcheck(@RequestBody UserDto user) {
		System.out.println("여기는 아이디 체크");
		UserDto pwdidcheckUser = mapper.pwdidcheck(user);
		if(pwdidcheckUser == null){
			return ResponseEntity.badRequest().body("메세지");
		}
		return ResponseEntity.ok(pwdidcheckUser);
	}
}

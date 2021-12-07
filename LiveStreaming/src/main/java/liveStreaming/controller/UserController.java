//2021-11-19
//controller
//박진현

package liveStreaming.controller;

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
		String pwd = passwordEncoder.encode(user.getU_pwd());
		log.info(pwd);
		user.setU_pwd(pwd);
		log.info(user.getU_pwd());
		return ResponseEntity.ok(service.create(user));
	}

	//20211120 강동하 회원가입 시 id 중복 체크
	@PostMapping("/idcheck")
	public ResponseEntity<Object> checkUser(@RequestBody UserDto user){

		return ResponseEntity.ok(service.id_chcek(user));
	}

	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@RequestBody UserDto user){
//				user.setU_pwd(passwordEncoder.encode(user.getU_pwd()));
	 			user = service.getByCredentials(
				user,
				passwordEncoder);

		 if(user != null) {
			//토큰 생성
			 final String token = tokenProvider.create(user);
			 user.setToken(token);

			return ResponseEntity.ok().body(user);
		}else{
			 return ResponseEntity.badRequest().body(user);
		 }
	}
	@PostMapping("/check")
	public ResponseEntity<Object> logincheck(@RequestBody UserDto user){

		if(user.getToken() == null) {
			return ResponseEntity.badRequest().body(user);
		}else{
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

		UserDto pwdfindUser = mapper.pwdFind(user);

		if(pwdfindUser == null ){
			return ResponseEntity.badRequest().body("에러");
		}
		return ResponseEntity.ok(pwdfindUser);
	}
	@PatchMapping("/pwdupdate")
	public ResponseEntity<Object> pwdupdate(@RequestBody UserDto user) {

		String pwd = passwordEncoder.encode(user.getU_pwd());
		user.setU_pwd(pwd);

		int pwdupdateUser = mapper.pwdupdate(user);

		return ResponseEntity.ok(pwdupdateUser);
	}
	//비밀번호 찾기 페이지 아이디 여부 확인
	@PostMapping("/pwdidcheck")
	public ResponseEntity<Object> pwdidcheck(@RequestBody UserDto user) {
		UserDto pwdidcheckUser = mapper.pwdidcheck(user);
		if(pwdidcheckUser == null){
			return ResponseEntity.badRequest().body("메세지");
		}
		return ResponseEntity.ok(pwdidcheckUser);
	}
}

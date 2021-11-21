//2021-11-19
//controller
//박진현

package liveStreaming.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import liveStreaming.dto.UserDto;
import liveStreaming.security.TokenProvider;
import liveStreaming.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	UserService service;


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
			 System.out.println("토큰생성");
			return ResponseEntity.ok().body(user);
		}else{
			 System.out.println("실패");
			 return ResponseEntity.badRequest().body(user);
		 }
	}


}

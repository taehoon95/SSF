package liveStreaming.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import liveStreaming.dto.UserDto;
import liveStreaming.service.TestService;
import liveStreaming.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	UserService service;

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

	@PostMapping("/signin")
	public ResponseEntity<Object> loginUser(@RequestBody UserDto user){
		return user != null
		       ? ResponseEntity.ok(service.getByCredentials(user)) : ResponseEntity.badRequest().body(user);
	}


//	@PostMapping("/register")
//	public ResponseEntity<Object> register(@RequestBody UserDto user){
//		return ResponseEntity.ok(service.register(user));
//	}



}

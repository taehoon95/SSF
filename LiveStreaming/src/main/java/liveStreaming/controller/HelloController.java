package liveStreaming.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import liveStreaming.service.TestService;

@RestController
@RequestMapping("/api")
public class HelloController {
	@Autowired
	TestService service;
	
	@GetMapping("/showTest")
	public ResponseEntity<Object> showTest(){
		System.out.println(1);
		return ResponseEntity.ok(service.showTest());
	}
}

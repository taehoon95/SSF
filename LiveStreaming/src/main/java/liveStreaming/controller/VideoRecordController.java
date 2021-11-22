package liveStreaming.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import liveStreaming.service.VideoRecordService;

@RestController
@RequestMapping("/api")
public class VideoRecordController {
    @Autowired
	VideoRecordService service;
	
	@GetMapping("/videorecord/{u_id}")
	public ResponseEntity<Object> showVideoRecord(@PathVariable String u_id){
		System.out.println(1);
		return ResponseEntity.ok(service.videoRecord(u_id));
	}

	// 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
	@GetMapping("/videoviews/{u_id}")
	public ResponseEntity<Object> showVideoViews(@PathVariable String u_id){
		System.out.println(1);
		return ResponseEntity.ok(service.videoViews(u_id));
	}
}
package liveStreaming.controller;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import liveStreaming.service.StreamingService;
import liveStreaming.dto.StreamingDto;

@RestController
@RequestMapping("/api")
public class StreamingController {
    @Autowired
    StreamingService service;

    // 2021-11-23 이태훈 스트리밍 insert
	// 2021-12-03 강동하 스트리밍 insert + streaming_management insert
	@PostMapping("/insertStreaming")
	public ResponseEntity<Object> insertStreaming(@RequestBody StreamingDto streaming){
		System.out.println(streaming);
		service.insertStreamingManagement(streaming);
		// management에서 s_code 받아와서 get
		return ResponseEntity.ok(service.insertStreaming(streaming));
	}
	
	@PatchMapping("/updateStreaming")
	public ResponseEntity<Object> updateStreaming(@RequestBody StreamingDto streaming){
		System.out.println(streaming);
		return ResponseEntity.ok(service.updateStreaming(streaming));
	}

	// 2021-11-23 이태훈 스트리밍 delete
	@DeleteMapping("/deleteStreaming")
	public ResponseEntity<Object> deleteStreaming(@RequestBody StreamingDto streaming){
		System.out.println("=================");
		System.out.println(streaming);
		System.out.println("=================");
		return ResponseEntity.ok(service.deleteStreaming(streaming));
	}

    // 2021-11-23 이태훈 스트리밍 select
	@GetMapping("/showStreaming/{streaming}/{condition}")
	public ResponseEntity<Object> showStreaming(@PathVariable String streaming,@PathVariable String condition){
		StreamingDto stream = new StreamingDto();
		switch(condition) {
			case "l_title":
				stream.setL_title(streaming);
				break;
			case "u_id":
				stream.setL_title(streaming);
				break;
			case "l_description":
				stream.setL_title(streaming);
				break;
		}
		return ResponseEntity.ok(service.showStreaming(stream));
	}
	
	// 2021-11-25 이태훈 l_num으로 방검색
	@GetMapping("/showStreamingByLnum/{l_code}")
	public ResponseEntity<Object> showStreaming(@PathVariable String l_code){
		return ResponseEntity.ok(service.showStreamingByLnum(l_code));
	}


	// 2021-12-02  이태훈 search으로 방검색
	@GetMapping("/streamingInfiniteSearch/{search}/{pageNum}")
	public ResponseEntity<Object> streamingInfiniteSearch(@PathVariable String search,@PathVariable int pageNum){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("search", search);
		map.put("pageNum", pageNum);
		return ResponseEntity.ok(service.showSearchStreaming(map));
	}
	
	

	// 2021-12-02 강동하 방송 시작 썸네일 업로드 시 파일이름 중복체크
	@GetMapping("/streamfilename/{l_img}")
	public ResponseEntity<Object> streamFileName(@PathVariable String l_img){
		return ResponseEntity.ok(service.streamFileName(l_img));
	}

}
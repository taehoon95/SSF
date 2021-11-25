package liveStreaming.controller;
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
	@PostMapping("/insertStreaming")
	public ResponseEntity<Object> insertStreaming(@RequestBody StreamingDto streaming){
		System.out.println(streaming);
		return ResponseEntity.ok(service.insertStreaming(streaming));
	}
	
	@PatchMapping("/updateStreaming")
	public ResponseEntity<Object> updateStreaming(@RequestBody StreamingDto streaming){
		return ResponseEntity.ok(service.updateStreaming(streaming));
	}
	
	@DeleteMapping("/deleteStreaming")
	public ResponseEntity<Object> deleteStreaming(@RequestBody StreamingDto streaming){
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
}
package liveStreaming.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import liveStreaming.config.S3Uploader;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class S3Controller {
	private final S3Uploader s3Uploader;

	@GetMapping("/test")
	public ResponseEntity<Object> showTest() {
		return ResponseEntity.ok("test");
	}

	@CrossOrigin(origins = "*")
	@PostMapping("/upload")
	public ResponseEntity<Object> upload(@RequestParam(value = "file") MultipartFile multipartFile) throws IOException {
		
		return null;
//		return ResponseEntity.ok(s3Uploader.upload(multipartFile, "static"));
	}

	@CrossOrigin(origins="*")
	@PostMapping("/uploadimg")
	public ResponseEntity<Object> uploadImg(@RequestParam(value="file") MultipartFile multipartFile) throws IOException {

		return ResponseEntity.ok(s3Uploader.upload(multipartFile, "streaming"));
	}
}

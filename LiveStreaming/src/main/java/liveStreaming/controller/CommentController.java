package liveStreaming.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import liveStreaming.service.CommentService;
import liveStreaming.dto.CommentDto;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    CommentService service;

    // 2021-11-22 강동하 댓글 insert
	@PostMapping("/comment")
	public ResponseEntity<Object> commentInsert(@RequestBody CommentDto comment){
		System.out.println("===================");
		System.out.println(comment.getM_text());
		return ResponseEntity.ok(service.commentInsert(comment));
	}

    // 2021-11-23 강동하 댓글 select
	@GetMapping("/commentselect/{v_code}")
	public ResponseEntity<Object> commentSelect(@PathVariable String v_code){
		System.out.println("===================");
		System.out.println(v_code);
		return ResponseEntity.ok(service.commentSelect(v_code));
	}

    // 2021-11-24 강동하 댓글 update
	@PatchMapping("/commentupdate")
	public ResponseEntity<Object> commentUpdate(@RequestBody CommentDto comment){
		System.out.println("===================");
		System.out.println(comment.getM_num());
		System.out.println(comment.getM_text());
		return ResponseEntity.ok(service.commentUpdate(comment));
	}

    // 2021-11-23 강동하 댓글 delete
	@DeleteMapping("/commentdelete")
	public ResponseEntity<Object> commentDelete(@RequestBody CommentDto comment){
		System.out.println("===================");
		System.out.println(comment.getM_num());
		return ResponseEntity.ok(service.commentDelete(comment));
	}
}
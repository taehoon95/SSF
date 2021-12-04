package liveStreaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import liveStreaming.dto.CommentDto;
import liveStreaming.mapper.CommentMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CommentService {

	// 2021-11-22 강동하 파일 생성
	@Autowired
	CommentMapper mapper;

    // 2021-11-22 강동하 댓글 insert 기능
	public CommentDto commentInsert(CommentDto comment) {
		mapper.commentInsert(comment);
		// System.out.println("댓글 달았음");
		return comment;
	}
    // 2021-11-23 강동하 댓글 select 기능
	public List<CommentDto> commentSelect(String v_code) {
		// System.out.println("댓글 가져와");
		return mapper.commentSelect(v_code);
	}
    // 2021-11-24 강동하 댓글 update 기능
	public int commentUpdate(CommentDto comment) {
		// System.out.println("댓글 바꿔");
		return mapper.commentUpdate(comment);
	}
    // 2021-11-23 강동하 댓글 delete 기능
	public int commentDelete(CommentDto comment) {
		// System.out.println("댓글 지워");
		return mapper.commentDelete(comment);
	}
}

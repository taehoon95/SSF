package liveStreaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import liveStreaming.dto.CommentDto;
import liveStreaming.dto.StreamingDto;
import liveStreaming.mapper.CommentMapper;
import liveStreaming.mapper.StreamingMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class StreamingService {

	// 2021-11-23 이태훈
	@Autowired
	StreamingMapper mapper;

	// 2021-11-23 이태훈 스트리밍 리스트
	public List<StreamingDto> showStreaming(StreamingDto streaming) {
		return mapper.streamingList(streaming);
	}
	
    // 2021-11-23 이태훈 스트리밍 방 만들기
	public StreamingDto insertStreaming(StreamingDto streaming) {
		System.out.println(streaming);
		mapper.insertStreaming(streaming);
		return streaming;
	}

	// 2021-11-23 이태훈 스트리밍 이름, description 변경
	@Transactional
	public StreamingDto updateStreaming(StreamingDto streaming) {
		mapper.updateStreaming(streaming);
		return mapper.selectStreamingbyLnum(streaming.getL_code());
	}
	
	// 2021-11-23 이태훈 방송 종료시 스트리밍 삭제
	// 2021-12-03 강동하 방송 종료시 l_length 업데이트 추가
	@Transactional
	public int deleteStreaming(StreamingDto streaming) {
		System.out.println(streaming);
		return mapper.deleteStreaming(streaming);
	}
	
	// 2021-11-23 이태훈
	public StreamingDto showStreamingByLnum(String l_num) {
		return mapper.selectStreamingbyLnum(l_num);
	}

	// 2021-12-02 강동하 방송 시작 썸네일 업로드 시 파일이름 중복체크
	public int streamFileName(String l_img) {
		return mapper.streamFileName(l_img);
	}

	// 2021-12-03 강동하 스트리밍 streaming_management insert
	public StreamingDto insertStreamingManagement(StreamingDto streaming) {
		mapper.insertStreamingManagement(streaming);
		return streaming;
	}

	// // 2021-12-03 강동하 방송 종료 시 streaming_management l_length update
	// public StreamingDto updateEndLength(StreamingDto streaming) {
	// 	System.out.println(streaming.getS_code());
	// 	mapper.updateEndLength(streaming);
	// 	return streaming;
	// }
}

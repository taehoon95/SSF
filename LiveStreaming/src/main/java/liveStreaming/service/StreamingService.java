package liveStreaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

	// 2021-11-23 이태훈
	public List<StreamingDto> showStreaming(StreamingDto streaming) {
		return mapper.streamingList(streaming);
	}
	
    // 2021-11-23 이태훈
	public int insertStreaming(StreamingDto streaming) {
		return mapper.insertStreaming(streaming);
	}

	// 2021-11-23 이태훈
	public int updateStreaming(StreamingDto streaming) {
		return mapper.updateStreaming(streaming);
	}
	
	// 2021-11-23 이태훈
	public int deleteStreaming(StreamingDto streaming) {
		return mapper.deleteStreaming(streaming);
	}
}

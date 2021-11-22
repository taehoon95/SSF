package liveStreaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import liveStreaming.dto.VideoRecordDto;
import liveStreaming.mapper.VideoRecordMapper;

@Service
public class VideoRecordService {
    @Autowired
	VideoRecordMapper mapper;
	
	// 로그인 후 마이페이지 View
	public List<VideoRecordDto> videoRecord(String u_id){
		return mapper.videoRecord(u_id);
	}

	// 20211122 게시물 삭제 
	public int videoDelete(VideoRecordDto videoRecordDto){
		return mapper.videoDelete(videoRecordDto);
	}

	// 20211122 게시물 업로드
}
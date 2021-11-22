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
	
	public List<VideoRecordDto> videoRecord(String u_id){
		return mapper.videoRecord(u_id);
	}

	
	public int videoUpload(VideoRecordDto video) {
		return mapper.videoUpload(video);
  }

	// 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
	public List<VideoRecordDto> videoViews(String u_id){
		return mapper.videoViews(u_id);
	}
}
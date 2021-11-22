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
}
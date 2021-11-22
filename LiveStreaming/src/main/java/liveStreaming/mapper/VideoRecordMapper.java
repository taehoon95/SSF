package liveStreaming.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import liveStreaming.dto.VideoRecordDto;

@Repository
public interface VideoRecordMapper {
    // 2021 1119 윤성준
	// 마이페이지
    List<VideoRecordDto> videoRecord(String u_id);
    

    // 2021 1121 이태훈
    // 비디오 업로드
    int videoUpload(VideoRecordDto video);

    // 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
    List<VideoRecordDto> videoViews(String u_id);

}
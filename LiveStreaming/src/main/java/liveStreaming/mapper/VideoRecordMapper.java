package liveStreaming.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import liveStreaming.dto.VideoRecordDto;

@Repository
public interface VideoRecordMapper {
    // 2021 1119 윤성준
	// 마이페이지 View
    List<VideoRecordDto> videoRecord(String u_id);

    // 20211122 로그인 후 게시물 삭제
    int videoDelete(VideoRecordDto videoRecordDto);

    // 20211122 게시물 업로드
}
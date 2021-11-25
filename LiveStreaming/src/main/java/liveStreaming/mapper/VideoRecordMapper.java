package liveStreaming.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import liveStreaming.dto.VideoRecordDto;

@Repository
public interface VideoRecordMapper {
    
    // 20211119 윤성준 마이페이지 영상 조회
    List<VideoRecordDto> videoRecord(String u_id);
    
    // 20211122 윤성준 로그인 후 게시물 삭제
    int videoDelete(VideoRecordDto videoRecordDto);

    // 20211123 윤성준 Main video 전체 리스트검색문
    List<VideoRecordDto> mainVideo();

    // 20211123 윤성준 MainPage 조회수 탑5 영상 조회
    List<VideoRecordDto> videoTop5();

    // 2021 1121 이태훈 비디오 업로드
    int videoUpload(VideoRecordDto video);

    // 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
    List<VideoRecordDto> videoViews(String u_id);
    
    // 2021-11-22 강동하 WatchPage2 영상 정보 조회
    List<VideoRecordDto> thisVideo(String v_code);

    // 2021-11-25 강동하 영상 조회수 + 1
    int viewsInc(VideoRecordDto video);

}
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
	
	// 20211119 윤성준 로그인 후 마이페이지 영상 조회
	public List<VideoRecordDto> videoRecord(String u_id){
		return mapper.videoRecord(u_id);
	}

	// 20211122 윤성준 게시물 삭제 
	public int videoDelete(VideoRecordDto videoRecordDto){
		return mapper.videoDelete(videoRecordDto);
	}

	// 20211123 윤성준 Main video 전체 리스트 검색문
	public List<VideoRecordDto> mainVideo(){
		return mapper.mainVideo();
	}
	
	// 20211123 윤성준 MainPage 조회수 탑4 영상 조회
	public List<VideoRecordDto> videoTop5(){
		return mapper.videoTop5();
	}

	// 20211125 윤성준 All Video Search 전체에서 영상 조회
	public List<VideoRecordDto> videoSearch(String v_name){
		return mapper.videoSearch(v_name);
	}

	// 2021 1121 이태훈 비디오 업로드
	public int videoUpload(VideoRecordDto video) {
		return mapper.videoUpload(video);
  }

	// 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
	public List<VideoRecordDto> videoViews(String u_id){
		return mapper.videoViews(u_id);
	}

	// 2021-11-22 강동하 WatchPage2 영상 정보 조회
	public List<VideoRecordDto> thisVideo(String v_code){
		return mapper.thisVideo(v_code);
	}

	// 2021-11-25 강동하 영상 조회수 + 1
	public int viewsInc(VideoRecordDto video){
		return mapper.viewsInc(video);
	}

	// 2021-11-29 강동하 영상 업로드 시 영상제목 중복체크
	public List<VideoRecordDto> videoNameCheck(String v_name){
		return mapper.videoNameCheck(v_name);
	}

	// 2021-11-30 강동하 영상 업로드 시 영상파일이름 중복체크
	public int videoVfileCheck(String v_link){
		return mapper.videoVfileCheck(v_link);
	}

	// 2021-11-30 강동하 영상 업로드 시 영상썸네일이름 중복체크
	public int videoIfileCheck(String v_img){
		return mapper.videoIfileCheck(v_img);
	}
}
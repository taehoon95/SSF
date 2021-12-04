package liveStreaming.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import liveStreaming.dto.StreamingDto;

@Repository
public interface StreamingMapper {
	// 스트리밍 CRUD
	List<StreamingDto> streamingList(StreamingDto streaming);
	int deleteStreaming(StreamingDto u_id);
	int updateStreaming(StreamingDto streaming);
	int insertStreaming(StreamingDto streaming);
	// 스트리밍 방송 들어갈 경우 세팅 값 얻기
	StreamingDto selectStreamingbyLnum(String l_num);

	// 스트리밍 검색시 사용 u_id, l_title, l_description전부 검색
	List<StreamingDto> streamingSearchList(Map<String, Object> map);

	// 2021-12-02 강동하 방송 시작 시 썸네일 업로드 시 파일이름 중복체크
	int streamFileName(String l_img);

	//20211203 윤성준 MainPage 실시간 영상 랜덤으로 조회
	List<StreamingDto> liveVideo();

	// 2021-12-03 강동하 방송 시작 시 streaming_management insert
	int insertStreamingManagement(StreamingDto streaming);

	// 2021-12-03 강동하 방송 종료 시 streaming_management l_length update
	int updateEndLength(StreamingDto streaming);

}

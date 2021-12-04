package liveStreaming.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import liveStreaming.dto.StreamingDto;

@Repository
public interface StreamingMapper {
	List<StreamingDto> streamingList(StreamingDto streaming);
	int deleteStreaming(StreamingDto u_id);
	int updateStreaming(StreamingDto streaming);
	int insertStreaming(StreamingDto streaming);
	StreamingDto selectStreamingbyLnum(String l_num);

	// 2021-12-02 강동하 방송 시작 시 썸네일 업로드 시 파일이름 중복체크
	int streamFileName(String l_img);

	//20211203 윤성준 MainPage 실시간 영상 랜덤으로 조회
	List<StreamingDto> liveVideo();

}

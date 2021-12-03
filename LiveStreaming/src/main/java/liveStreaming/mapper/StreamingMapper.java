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

	// 2021-12-03 강동하 방송 시작 시 streaming_management insert
	int insertStreamingManagement(StreamingDto streaming);

	// 2021-12-03 강동하 방송 종료 시 streaming_management l_length update
	int updateEndLength(StreamingDto streaming);
}

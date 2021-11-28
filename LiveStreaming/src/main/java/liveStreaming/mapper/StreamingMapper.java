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
}

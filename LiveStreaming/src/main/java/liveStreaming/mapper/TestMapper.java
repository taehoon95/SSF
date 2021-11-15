package liveStreaming.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import liveStreaming.dto.TestDto;

@Repository
public interface TestMapper {
	public List<TestDto> showTest();
}

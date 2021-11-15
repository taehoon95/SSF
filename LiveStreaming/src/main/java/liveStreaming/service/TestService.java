package liveStreaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import liveStreaming.dto.TestDto;
import liveStreaming.mapper.TestMapper;

@Service
public class TestService {

	@Autowired
	TestMapper mapper;
	
	public List<TestDto> showTest(){
		return mapper.showTest();
	}
}

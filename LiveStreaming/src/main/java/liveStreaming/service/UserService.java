package liveStreaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import liveStreaming.dto.TestDto;
import liveStreaming.dto.UserDto;
import liveStreaming.mapper.TestMapper;
import liveStreaming.mapper.UserMapper;


// transaction : 비즈니스 로직
// 비즈니스 로직 처리중 에러가 발생시 그시점에서 로직을 멈추고 데이터 롤백
@Service
public class UserService {

	@Autowired
	UserMapper mapper;
	
	public int register(UserDto user){
		return mapper.register(user);
	}
}

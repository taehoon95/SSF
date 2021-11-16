package liveStreaming.mapper;

import java.util.Date;

import org.joda.time.DateTime;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import liveStreaming.dto.UserDto;

@RunWith( SpringRunner.class )
@SpringBootTest
// 자동 롤백
@Transactional
// Test 순서 설정
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserMapperTest {

	// 의존성 주입
	// singleton느낌 : UserMapper mapper = new UserMapper() 객체가 생성
	@Autowired
	UserMapper mapper;
	
	//@Test
	public void test01register() {
		System.out.println("----------------------------------------");
		System.out.println(new DateTime());
		System.out.println("----------------------------------------");
		
		UserDto user = new UserDto("test4", "123", "ㅇㅇㅇ", "m", "ytt@sss", "123",new Date());
		int res = mapper.register(user);

		Assertions.assertEquals(1, res);
	}

	@Test
	public void test02login() {
		UserDto user = new UserDto();
		user.setU_id("test2");
		user.setU_pwd("123");
		UserDto res = mapper.loginUser(user);
		System.out.println(res);
		Assertions.assertNotNull(res);
	}
}

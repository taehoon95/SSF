package liveStreaming.mapper;

import static org.junit.Assert.fail;

import java.util.HashMap;
import java.util.List;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import liveStreaming.dto.StreamingDto;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class StreamingMapperTest {
	/*
	 *  2021-11-23 이태훈 StreamingMapperTest
	 *  CRUD
	 */ 
	@Autowired
	StreamingMapper mapper;

	
	//@Test
	public void test01StreamingList() {
		StreamingDto streaming = new StreamingDto();
		List<StreamingDto> list = mapper.streamingList(streaming);
		for (StreamingDto t : list) {
			System.out.println(t);
		}
		Assertions.assertNotNull(list);
	}

	//@Test
	public void test02InsertStreaming() {
		StreamingDto st = new StreamingDto();
		st.setL_title("test2");
		st.setL_description("test2 des");
		st.setU_id("kang97");
		int res = mapper.insertStreaming(st);
		Assertions.assertEquals(1, res);
	}

	//@Test
	public void test03UpdateStreaming() {
		StreamingDto st = new StreamingDto();
		st.setL_code("2");
		st.setL_title("test24");
		st.setL_description("test24 des");
		st.setU_id("kang97");
		int res = mapper.updateStreaming(st);
		Assertions.assertEquals(1, res);
	}
	
	//@Test
	public void test04DeleteStreaming() {
		StreamingDto st = new StreamingDto();
		st.setL_code("3");
		st.setU_id("kang97");
		int res = mapper.deleteStreaming(st);
		Assertions.assertEquals(1, res);
	}

	@Test
	public void test05StreamingSearchList() {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("search", "2");
		map.put("pageNum", 0);
		List<StreamingDto> list = mapper.streamingSearchList(map);
		for (StreamingDto t : list) {
			System.out.println(t);
		}
		Assertions.assertNotNull(list);
	}
	
	
	

}

package liveStreaming.mapper;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import liveStreaming.dto.VideoRecordDto;

@RunWith( SpringRunner.class )
@SpringBootTest
@Transactional
public class VideoRecordMapperTest {

	@Autowired
	VideoRecordMapper mapper;
	
	//@Test
	public void testVideoUpload() {
		VideoRecordDto video = new VideoRecordDto();
		video.setV_code("avi09");
		video.setV_name("test");
		video.setV_img("https://ssfupload.s3.ap-northeast-2.amazonaws.com/static/lion-g3026311f0_1920.jpg");
		video.setC_code("GM001");
		video.setV_length(1111);
		video.setU_id("kang97");
		video.setV_views(0);
		video.setV_link("https://ssfupload.s3.ap-northeast-2.amazonaws.com/static/League+of+Legends+(TM)+Client+2021-11-20+20-16-04.mp4");
		int res = mapper.videoUpload(video);
		System.out.println(video);
		System.out.println(res);
		Assertions.assertEquals(1, res);
	}

	@Test
	public void test06StreamingInfiniteSearchList() {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("search", "롤");
		map.put("pageNum", 0);
		List<VideoRecordDto> res = mapper.videoInfiniteSearch(map);
		for(VideoRecordDto r : res) {
			System.out.println(r);
		}
		Assertions.assertNotNull(res);
	}
}

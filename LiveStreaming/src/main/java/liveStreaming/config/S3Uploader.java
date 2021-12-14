package liveStreaming.config;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class S3Uploader {
	private final AmazonS3Client amazonS3Client;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;	// S3 버킷 이름

	public String upload(MultipartFile multipartFile, String dirName) throws IOException {
		// MultipartFile을 통해 객체를 전달받고, S3에 전달 할 수 있도록 File로 전환(S3에 multipartFile 타입은 전송이 안됨)
		File uploadFile = new File(multipartFile.getOriginalFilename());
		// createNewFile() 메소드로 uploadFile이라는 빈 파일 생성
		uploadFile.createNewFile();
		// 파일 데이터를 쓰기 위해 FileOutputStream으로 스트림을 생성
		FileOutputStream fos = new FileOutputStream(uploadFile);
		// FileOutputStream으로 생성된 fos에 getBytes()로 데이터를 바이트 배열로 추출한 후 업데이트
		fos.write(multipartFile.getBytes());
		fos.close();
		return upload(uploadFile, dirName);
	}

	// S3로 파일 업로드 하기
	private String upload(File uploadFile, String dirName) {
		// S3에 저장된 파일 이름
		String fileName = dirName + "/" + uploadFile.getName();
		// S3로 업로드
		String uploadImageUrl = putS3(uploadFile, fileName);
		return uploadImageUrl;
	}  

	// S3로 업로드
	private String putS3(File uploadFile, String fileName) {
		// 파일을 업로드 하기 위해 PutObjectRequest 객체를 생성하여 올림 (방식은 두개 중 bucketname, key, file 방식으로 업로드)
		// 외부에 공개할 이미지임, withCannedAcl을 사용하여 해당 파일에 public read 권한을 추가하여 올림
		amazonS3Client.putObject(
				new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
		return amazonS3Client.getUrl(bucket, fileName).toString();
	}
}

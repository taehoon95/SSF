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
	private String bucket;

	public String upload(MultipartFile multipartFile, String dirName) throws IOException {
		System.out.println("-----------------------------------------------------");
		System.out.println(multipartFile.getContentType());
		System.out.println(multipartFile.getSize());
		System.out.println(multipartFile.getOriginalFilename());
		System.out.println("-----------------------------------------------------");
		File uploadFile = new File(multipartFile.getOriginalFilename());
		uploadFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(uploadFile);
		fos.write(multipartFile.getBytes());
		fos.close();
		return upload(uploadFile, dirName);
	}

	private String upload(File uploadFile, String dirName) {
		System.out.println("-----------------------------------------------------");
		System.out.println("upload2");
		System.out.println("-----------------------------------------------------");
		String fileName = dirName + "/" + uploadFile.getName();
		String uploadImageUrl = putS3(uploadFile, fileName);
		return uploadImageUrl;
	}

	private String putS3(File uploadFile, String fileName) {
		System.out.println("-----------------------------------------------------");
		System.out.println("putS3");
		System.out.println(uploadFile);
		System.out.println(fileName);
		System.out.println("-----------------------------------------------------");
		amazonS3Client.putObject(
				new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
		System.out.println(1111);
		return amazonS3Client.getUrl(bucket, fileName).toString();
	}
}

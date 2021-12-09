// 2021-11-19
//토큰 생성 페이지
//박진현
package liveStreaming.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import liveStreaming.dto.UserDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
//사용자의 정보를 받아 JWT를 생성
public class TokenProvider {
    private static final String SECRET_KEY = "NMA8JPctFuna59f5";
    // create
    public String create(UserDto user) {
        //기한은 지금부터 1일로 선정
        Date expridyDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS));
        //jwt token 생성
        return Jwts.builder()
                //header에 들어갈 내용 및 서명을 하기 위한 SECRECT_KEY
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                //payload에 들어갈 내용
                .setSubject(user.getU_id()) //sub
                .setIssuer("demo app") // iss
                .setIssuedAt(new Date()) //iat
                .setExpiration(expridyDate) // exp
                .compact();

    }

    public String validateAndGetUserId(String token){
        //parseClaimsJws 메서드가 Base64로 디코딩 및 파싱
        // 헤더와 페이로드를 setSigningKEy로 넘어온 시크릿을 이용해 서명한 후 token의 서명과 비교
        // 위조되지 않았다면 페이로드(Claoims) 리턴, 위조라면 예외를 날림
        // 그중 우리는 userID가 필요하므로 getBody를 부른다.
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}

package liveStreaming.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// spring cors 설정 (security 설정을 해두어서 꼭 8080에서 로그인 후 넘어가자)
@Configuration
public class WebConfig implements WebMvcConfigurer {


  //allowedOrgin 메소드를 이용하여 자원 공유를 허락할 origin 지정
  //allowedMethods를 이용해서 http method를 지정
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOrigins("https://localhost:3000/")
        .allowedMethods("GET", "POST", "PATCH", "DELETE");
  }
}
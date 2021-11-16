package liveStreaming.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


//20211116 이태훈 security 에서 cors설정 

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
	/*
	 HTTP 설정(기존에 사용하던 설정에 추가하면 된다) 스프링 보안에서 기본적으로 활성화되어 있기 때문에 
	 csrf 보호를 비활성화해야 합니다. 여기에서 cors origin을 허용하는 코드를 볼 수 있습니다.
	*/
	httpSecurity.cors().and().csrf().disable(); //cors 필터 등록
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource(){
	CorsConfiguration configuration = new CorsConfiguration();
	configuration.setAllowedOrigins(Arrays.asList("*" ));
	configuration.setAllowedMethods(Arrays.asList("*"));
	configuration.setAllowedHeaders(Arrays.asList("*"));
	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/**", configuration);
	return source;
	}
}

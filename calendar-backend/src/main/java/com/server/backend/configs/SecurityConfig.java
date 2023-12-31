package com.server.backend.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.backend.security.AuthManager;
import com.server.backend.security.filters.SessionFilter;
import com.server.backend.security.filters.UserPassFilter;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.*;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;

@Configuration
@EnableWebSecurity
@EnableRedisHttpSession
public class SecurityConfig {
    private final AuthManager authManager;
    private final ObjectMapper objectMapper;
    private  final HttpSession session;
    @Value("${spring.profiles.active}")
    private String ENVIRONMENT;

    public SecurityConfig(AuthManager authManager, ObjectMapper objectMapper, HttpSession session) {
        this.authManager = authManager;
        this.objectMapper = objectMapper;
        this.session = session;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/actuator/health/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new UserPassFilter(authManager, objectMapper), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(new SessionFilter(session), UserPassFilter.class);
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        http
            .csrf((csrf) -> csrf
                            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                            .csrfTokenRequestHandler(requestHandler)
            );
        if(ENVIRONMENT.equals("dev")) {
            http.cors(c -> c.configurationSource(
                    r -> {
                        CorsConfiguration configuration = new CorsConfiguration();
                        configuration.setAllowedOrigins(List.of(
                                "http://localhost:5173"
                        ));
                        configuration.setAllowedHeaders(List.of("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedMethods(List.of(
                                "GET", "POST", "DELETE", "PUT", "OPTIONS"
                        ));
                        return configuration;
                    }
            ));
        }
        return http.build();
    }
}

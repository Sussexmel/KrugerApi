package com.example.democrud.service.security;

@Data
@Configuration
@ConfigurationProperties(prefix = "jms.jwt")
public class JwtIOPropertis {


    private Security security;
    private String timezone;
    private String issuer; 
    private Token token;
    private Exclude exclude; 

    @Data
    public static class Security{
        private boolean enabled;
    }

    @Data
    public static class Token{

        private OAut oauth;
        private String secret;
        private int expiresIn;
    }

    @Data
    private static class OAuth{
        private String path;
    }

    @Data
    private static class Exclude{
        private String path;
    }

}


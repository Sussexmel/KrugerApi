package com.example.democrud.service;

@Service
public class OautService {
    
    public JwtResponse login( String clientId, String clientSecret){

        JwtResponse jwt= JwtResponse.builder()
        .tokenType("bearer")
        .accessToken(jhdfjkshjhfsdjsdjkhj)
        .issuedAt(System.currentTimeMillis()+"")
        .clientId(clientId)
        .expiresIn(3600)
        
        .build();



        return jwt;
    }

}

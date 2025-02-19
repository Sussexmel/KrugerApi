package com.example.democrud.controller;

import com.example.democrud.service.OautService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "V1.0")
public class OAutController {

	@Autowired OautService oautService;

	@PostMapping(path = "oaut/client_credential/accesstoken",consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)

	public ResponseEntity<Object>loguin(@RequestBody MultiValueMap<String, String>paramMap, @RequestParam("grant_type")String grantType){
		return ResponseEntity.ok(oautService.login(paramMap.getFirst("client_id"), paramMap.getFirst("client_secret")));

	}
	
}

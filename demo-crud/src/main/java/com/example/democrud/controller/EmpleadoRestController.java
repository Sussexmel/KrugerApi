package com.example.democrud.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.democrud.model.Empleado;
import com.example.democrud.service.api.EmpleadoServiceAPI;


@RestController
@RequestMapping(value = "/api/empleado/")
@CrossOrigin("*")
public class EmpleadoRestController {

	@Autowired
	private EmpleadoServiceAPI empleadoServiceAPI;

	@GetMapping(value = "/all")
	public List<Empleado> getAll() {
		return empleadoServiceAPI.getAll();
	}
	
	@GetMapping(value = "/find/{id}")
	public Empleado find(@PathVariable Long id) {
		return empleadoServiceAPI.get(id);
	}

	@PostMapping(value = "/save")
	public ResponseEntity<Empleado> save(@RequestBody @Valid Empleado empleado) {
		// validar cedula
		Empleado obj = empleadoServiceAPI.save(empleado);
		// crear usuario y contraseña
		return new ResponseEntity<Empleado>(obj, HttpStatus.OK);
	}

	@GetMapping(value = "/delete/{id}")
	public ResponseEntity<Empleado> delete(@PathVariable Long id) {
		Empleado empleado = empleadoServiceAPI.get(id);
		if (empleado != null) {
			empleadoServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Empleado>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<Empleado>(empleado, HttpStatus.OK);
	}

}

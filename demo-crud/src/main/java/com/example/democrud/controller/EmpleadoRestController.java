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

		boolean cedulaCorrecta = false;
		String cedula= empleado.getCedula();
 
		try {
		 
		if (cedula.length() == 10) // ConstantesApp.LongitudCedula
		{
		int tercerDigito = Integer.parseInt(cedula.substring(2, 3));
		if (tercerDigito < 6) {
		// Coeficientes de validación cédula
		// El decimo digito se lo considera dígito verificador
		 int[] coefValCedula = { 2, 1, 2, 1, 2, 1, 2, 1, 2 };
		 int verificador = Integer.parseInt(cedula.substring(9,10));
		 int suma = 0;
		 int digito = 0;
		for (int i = 0; i < (cedula.length() - 1); i++) {
		 digito = Integer.parseInt(cedula.substring(i, i + 1))* coefValCedula[i];
		 suma += ((digito % 10) + (digito / 10));
		}
		 
		if ((suma % 10 == 0) && (suma % 10 == verificador)) {
		 cedulaCorrecta = true;
		}
		else if ((10 - (suma % 10)) == verificador) {
		 cedulaCorrecta = true;
		} else {
		 cedulaCorrecta = false;
		}
		} else {
		cedulaCorrecta = false;
		}
		} else {
		cedulaCorrecta = false;
		}
		} catch (NumberFormatException nfe) {
		cedulaCorrecta = false;
		} catch (Exception err) {
		System.out.println("Una excepcion ocurrio en el proceso de validadcion");
		cedulaCorrecta = false;
		}
		 
		if (!cedulaCorrecta) {
		System.out.println("La Cédula ingresada es Incorrecta");
		}			
		
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

package com.example.democrud.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;



@Entity
public class Empleado
 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long id;

	@Column
	@NotBlank
	private String Cedula;	

	@Column
	@NotBlank
	private String nombre;
	
	@Column
	@NotBlank
	private String apellido;
	
	@Column
	@NotBlank
	private String email;

	@Column
	private String fecha_nacimiento;

	@Column	
	private String direccion;
	
	@Column
	private String telefono;

	@Column
	private Boolean vacunado;

	@Column
	private String tipo_vacuna;

	@Column
	private String fecha_vacunacion;

	@Column
	private int dosis;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCedula() {
		return Cedula;
	}

	public void setCedula(String cedula) {
		Cedula = cedula;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFecha_nacimiento() {
		return fecha_nacimiento;
	}

	public void setFecha_nacimiento(String fecha_nacimiento) {
		this.fecha_nacimiento = fecha_nacimiento;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Boolean getVacunado() {
		return vacunado;
	}

	public void setVacunado(Boolean vacunado) {
		this.vacunado = vacunado;
	}

	public String getTipo_vacuna() {
		return tipo_vacuna;
	}

	public void setTipo_vacuna(String tipo_vacuna) {
		this.tipo_vacuna = tipo_vacuna;
	}

	public String getFecha_vacunacion() {
		return fecha_vacunacion;
	}

	public void setFecha_vacunacion(String fecha_vacunacion) {
		this.fecha_vacunacion = fecha_vacunacion;
	}

	public int getDosis() {
		return dosis;
	}

	public void setDosis(int dosis) {
		this.dosis = dosis;
	}
	
}

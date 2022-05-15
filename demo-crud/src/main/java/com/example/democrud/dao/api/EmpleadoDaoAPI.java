package com.example.democrud.dao.api;

import org.springframework.data.repository.CrudRepository;

import com.example.democrud.model.Empleado;

public interface EmpleadoDaoAPI extends CrudRepository<Empleado, Long> {

}

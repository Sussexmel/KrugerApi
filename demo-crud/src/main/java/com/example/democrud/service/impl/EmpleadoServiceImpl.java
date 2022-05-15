package com.example.democrud.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import com.example.democrud.commons.GenericServiceImpl;
import com.example.democrud.dao.api.EmpleadoDaoAPI;
import com.example.democrud.model.Empleado;
import com.example.democrud.service.api.EmpleadoServiceAPI;


@Service
public class EmpleadoServiceImpl extends GenericServiceImpl<Empleado, Long> implements EmpleadoServiceAPI {

	@Autowired
	private EmpleadoDaoAPI empleadoDaoAPI;
	
	@Override
	public CrudRepository<Empleado, Long> getDao() {
		return empleadoDaoAPI;
	}

}

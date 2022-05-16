import React, { Component } from 'react';
import './App.css';
import { EmpleadoService } from './service/EmpleadoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';


//import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.Toast = React.createRef();
    this.state = {
      visible : false,
      empleados_filtro : [],
      busqueda:'',
      busqueda_cedula: '',
     // busqueda_tipoVacuna: '',
      empleado: {
        id: null,
        cedula: null,
        nombre: null,
        apellido: null,
        email: null,
        fecha_nacimiento: null,
        direccion: null,
        telefono : null,
        vacunado: null,
        tipo_vacuna: null,
        fecha_vacunacion: null,
        dosis: null
      },
      selectedEmpleado : {

      }
    };
    this.items = [
      {
        label : 'Nuevo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.empleadoService = new EmpleadoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.empleadoService.getAll().then(data => this.setState({empleados: data, empleados_filtro:data}))
    //this.setState({empleados_filtro: this.state.empleados})
  }

  save() {
    this.empleadoService.save(this.state.empleado).then(data => {
      this.setState({
        visible : false,
        empleado: {
          id: null,
          cedula: null,
          nombre: null,
          apellido: null,
          email: null,
          fecha_nacimiento: null,
          direccion: null,
          telefono : null,
          vacunado: null,
          tipo_vacuna: null,
          fecha_vacunacion: null,
          dosis: null
        }
      });
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.empleadoService.getAll().then(data => this.setState({empleados: data}))      
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.empleadoService.delete(this.state.selectedEmpleado.id).then(data => {
        this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.empleadoService.getAll().then(data => this.setState({empleados: data}));
      });
    }
  }

  //filtrar fecha vacunacion
  onChange=async e=>{
    e.persist();
    await this.setState({busqueda:e.target.value})
    this.filtrarElementos();
  }

  filtrarElementos=()=>{
    var search=this.state.empleados.filter(item=>{
        if (item.fecha_vacunacion.includes(this.state.busqueda)){
          return item
        }
    })
    this.setState({empleados_filtro:search})
  }

  //filtrar cedula
  onChangeCedula=async e=>{
    e.persist();
    await this.setState({busqueda_cedula:e.target.value})
    this.filtrarElementosCedula();
  }

  filtrarElementosCedula=()=>{
    var search=this.state.empleados.filter(item=>{
        if (item.cedula.includes(this.state.busqueda_cedula)){
          return item
        }
    })
    this.setState({empleados_filtro:search})
  }

//filtrar tipo vacuna 


  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <input type="text" placeholder='Fecha vacunación' name="fecha" value={this.state.busqueda}
        onChange={this.onChange} />

        <br/>
        <input type="text" name="nombre" placeholder='Cedula' value={this.state.busqueda_cedula}
        onChange={this.onChangeCedula} />


        <Panel header="React CRUD App">
            <DataTable value={this.state.empleados_filtro} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedEmpleado} onSelectionChange={e => this.setState({selectedEmpleado: e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="cedula" header="Cedula"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="apellido" header="Apellido"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="fecha_nacimiento" header="Fecha Nacimiento"></Column>
              <Column field="direccion" header="Direccion"></Column>
              <Column field="telefono" header="Teléfono"></Column>
              <Column field="vacunado" header="Estado vacunación"></Column>
              <Column field="tipo_vacuna" header="Tipo vacuna"></Column>
              <Column field="fecha_vacunacion" header="Fecha vacunación"></Column>
              <Column field="dosis" header="Dosis"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear empleado" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="empleado-form">
            <label htmlFor="nombre">Nombre</label>
              <span className="p-float-label">              
                <InputText value={this.state.empleado.nombre} style={{width : '100%'}} id="nombre" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.nombre = val;

                        return { empleado };
                    })}
                  } />                
              </span>
              <br/>
              <label htmlFor="apellido">Apellido</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.apellido} style={{width : '100%'}} id="apellido" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.apellido = val

                        return { empleado };
                    })}
                  } />
                
              </span>
              <br/>

              <label htmlFor="email">Email</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.email} style={{width : '100%'}} id="email" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.email = val

                        return { empleado };
                    })}
                  } />
                
              </span>
              <br/> 
              <label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.fecha_nacimiento} style={{width : '100%'}} id="fecha_nacimiento" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.fecha_nacimiento = val

                        return { empleado };
                    })}
                  } />
                
              </span>
              <br/>
              <label htmlFor="direccion">Dirección</label>   
              <span className="p-float-label">
                <InputText value={this.state.empleado.direccion} style={{width : '100%'}} id="direccion" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.direccion = val

                        return { empleado };
                    })}
                  } />
                
              </span>
              <br/>
              <label htmlFor="telefono">Teléfono</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.telefono} style={{width : '100%'}} id="telefono" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.telefono = val

                        return { empleado };
                    })}
                  } />
                
              </span>
              <br/>
              <label htmlFor="vacunado">Estado Vacunación</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.vacunado} style={{width : '100%'}} id="vacunado" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.vacunado = val

                        return { empleado };
                    })}
                  } />
                
              </span>
              <br/>
              <label htmlFor="tipo_vacuna">Tipo vacuna</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.tipo_vacuna} style={{width : '100%'}} id="tipo_vacuna" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.tipo_vacuna = val

                        return { empleado };
                    })}
                  } />                
              </span>     

              <br/>
              <label htmlFor="fecha_vacunacion">Feha Vacunación</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.fecha_vacunacion} style={{width : '100%'}} id="fecha_vacunacion" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.fecha_vacunacion = val

                        return { empleado };
                    })}
                  } />
                
              </span>
              <br/>
              <label htmlFor="dosis">Dosis</label>
              <span className="p-float-label">
                <InputText value={this.state.empleado.dosis} style={{width : '100%'}} id="dosis" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.dosis = val

                        return { empleado };
                    })}
                  } />
                
              </span>
            </form>
        </Dialog>
       <Toast ref={this.Toast} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      empleado : {
        id: null,
        cedula: null,
        nombre: null,
        apellido: null,
        email: null,
        fecha_nacimiento: null,
        direccion: null,
        telefono : null,
        estado_vacuna: null,
        fecha_vacuna: null,
        dosis: null
      }
    });
    document.getElementById('empleado-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      empleado : {
        id: this.state.selectedEmpleado.id,
        cedula: this.state.selectedEmpleado.cedula,
        nombre: this.state.selectedEmpleado.nombre,
        apellido: this.state.selectedEmpleado.apellido,
        email: this.state.selectedEmpleado.email,
        fecha_nacimiento: this.state.selectedEmpleado.fecha_nacimiento,
        direccion: this.state.selectedEmpleado.direccion,
        telefono : this.state.selectedEmpleado.telefono,
        estado_vacuna : this.state.selectedEmpleado.estado_vacuna,
        fecha_vacuna : this.state.selectedEmpleado.fecha_vacuna,
        dosis : this.state.selectedEmpleado.dosis
        
      }
    })
  }
}

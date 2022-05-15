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
import {Growl} from 'primereact/growl';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      empleado: {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono : null
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
    this.empleadoService.getAll().then(data => this.setState({empleados: data}))
  }

  save() {
    this.empleadoService.save(this.state.empleado).then(data => {
      this.setState({
        visible : false,
        empleado: {
          id: null,
          nombre: null,
          apellido: null,
          direccion: null,
          telefono : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.empleadoService.getAll().then(data => this.setState({empleados: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.empleadoService.delete(this.state.selectedEmpleado.id).then(data => {
        this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.empleadoService.getAll().then(data => this.setState({empleados: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="React CRUD App">
            <DataTable value={this.state.empleados} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedEmpleado} onSelectionChange={e => this.setState({selectedEmpleado: e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="apellido" header="Apellido"></Column>
              <Column field="direccion" header="Direccion"></Column>
              <Column field="telefono" header="Teléfono"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear empleado" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="empleado-form">
              <span className="p-float-label">
                <InputText value={this.state.empleado.nombre} style={{width : '100%'}} id="nombre" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.nombre = val;

                        return { empleado };
                    })}
                  } />
                <label htmlFor="nombre">Nombre</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.empleado.apellido} style={{width : '100%'}} id="apellido" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.apellido = val

                        return { empleado };
                    })}
                  } />
                <label htmlFor="apellido">Apellido</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.empleado.direccion} style={{width : '100%'}} id="direccion" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.direccion = val

                        return { empleado };
                    })}
                  } />
                <label htmlFor="direccion">Dirección</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.empleado.telefono} style={{width : '100%'}} id="telefono" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let empleado = Object.assign({}, prevState.empleado);
                        empleado.telefono = val

                        return { empleado };
                    })}
                  } />
                <label htmlFor="telefono">Teléfono</label>
              </span>
            </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      empleado : {
        id: null,
        nombre: null,
        apellido: null,
        direccion: null,
        telefono : null
      }
    });
    document.getElementById('empleado-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      empleado : {
        id: this.state.selectedEmpleado.id,
        nombre: this.state.selectedEmpleado.nombre,
        apellido: this.state.selectedEmpleado.apellido,
        direccion: this.state.selectedEmpleado.direccion,
        telefono : this.state.selectedEmpleado.telefono
      }
    })
  }
}

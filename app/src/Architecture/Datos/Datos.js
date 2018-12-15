import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from "firebase";
import Navegacion from '../Navegacion/Navegacion';

import './Datos.css';
import imagen from './imagen.png';


let Nav = Navegacion;

class Datos extends Component {

  constructor(props){
    var userId = firebase.auth().currentUser.uid;

    var cont = 1;
    var App = 'EnCo';

      super(props)
      this.state = {
        App: 'EnCo',
        QRExpositor: '',
        delay: 100,
        result: '',
        registros: '',
      }
      setTimeout(
      function() {
        return firebase.database().ref(App + '/Expositores/' + userId + '/').once('value').then(function(snapshot) {
          cont = (snapshot.val().Contador) || 0;
        })

      },
      0);
      setTimeout(
      function() {
          this.setState({registros: cont});
      }
      .bind(this),
      1000);

    }

  BotonRegresar = (event) => {

    this.props.dispatch({
      type: 'Usuario_Accion',
      UserValidation:'active',
    })

  }

  BotonDescargar = (event) => {

    alert('Pronto estara Listo')

  }


  render() {
    var numero = this.state.registros;
    return (

      <div className='root'>
      {<Nav/>}
        <div className='Data'>
          <div className='Titulos'>

          <p className="Selector">Productos</p>
          <p className="Selector">Servicios</p>
          <p className="Selector">Trabajadores</p>

          </div>

          <div className='Opciones'>

          <p className="TIPOaccionA">AGREGAR</p>
          <p className="TIPOaccionM">EDITAR</p>
          <p className="TIPOaccionE">ELIMINAR</p>

          </div>




          <div className='Formulario'>



              <div>
                <label >
                <input className="RadioButon" type="radio" value="option1" checked="0" />
                  Mecanico
                </label>
                <input className="NombreProducto" type="text" onChange={this.handleChangeEmail} required placeholder="  Nombre del Producto" />
              </div>
              <div>
                <label >
                <input className="RadioButon" type="radio" value="option2" checked="" />
                  Exterior...
                </label>
                <input className="NombreProducto" type="text" onChange={this.handleChangeEmail} required placeholder="  Descripcion" />
              </div>
              <div className="espacioDerecha">
                <input className="NombreProducto2" type="text" onChange={this.handleChangeEmail} required placeholder="  Ganancia en %" />
                <input className="NombreProducto2" type="text" onChange={this.handleChangeEmail} required placeholder="  Trabajador Asignado " />
              </div>

              <div className="botonesInferiores">
                <div className="conjuntoimagen">
                  <img src={imagen} className="imagenSubir" />
                  <a className="subirImagen" >subir</a>
                </div>
                <a className="boton_personalizado_Accion" >Agregar</a>
              </div>

          </div>

        </div>
      </div>
    );
  }
}

function mapStatetoProps(state, props){
  return {
    //enviar datos de App.js a esta Vista, si es que son necesarios
  }
}

export default connect(mapStatetoProps)(Datos);

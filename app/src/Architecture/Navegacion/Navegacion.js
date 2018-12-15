import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from "firebase";

import logo from './LogoGrande.png';
import './Navegacion.css';



class Navegacion extends Component {

  CerrarSesion = (event) => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    })

    this.props.dispatch({
      type: 'Usuario_Accion',
      UserValidation:'login',
    })

  }

  ActualizarDato = (event) => {
    this.props.dispatch({
      type: 'Usuario_Accion',
      UserValidation:'data',
    })
  }

  Estadisticas = (event) => {
    this.props.dispatch({
      type: 'Usuario_Accion',
      UserValidation:'active',
    })
  }


  render() {
    var Email = firebase.auth().currentUser.email;
    return (
      <div >
        <div className="NavegacionIzquierda">
        <img src={logo} className="Menu-logo" alt="logo" />
        <nav class="menuDesplegable">
          <ul >
            <li ><a class="tituloMenu"href="#">Servicios</a>
              <ul class="ulinterno">
                <li><a href="#">Activos</a></li>
                <li><a href="#">Nuevo</a></li>
              </ul>
            </li>
            <li><a class="tituloMenu" href="#">Administrativo</a>
              <ul class="ulinterno">
                <li><a href="#">Ventas</a></li>
                <li><a onClick={this.Estadisticas} >Estadisticas</a></li>
                <li><a onClick={this.ActualizarDato} >Registros</a></li>
              </ul>
            </li>
            <li><a class="tituloMenu" href="#">Productos</a>
              <ul class="ulinterno">
                <li><a href="#">Vender</a></li>
                <li><a href="#">Existencias</a></li>
              </ul>
            </li>
            <li><a class="tituloMenu" href="#">Clientes</a>
              <ul class="ulinterno">
                <li><a href="#">Nuevo</a></li>
                <li><a href="#">Con Servicios</a></li>
              </ul>
            </li>
            <li><a class="tituloMenu" href="#">Trabajadores</a>
              <ul class="ulinterno">
                <li><a href="#">Asignar</a></li>
                <li><a href="#">Asistencias</a></li>
                <li><a href="#">Reportes</a></li>
              </ul>
            </li>
          </ul>
        </nav>
        </div>
        <div className="Navegacion">
          <img src={logo} className="Navegacion-logo" alt="logo" />
          <p className="Email">{Email}</p>
          <a className="Navegacion-title" onClick={this.CerrarSesion}>Cerrar Sesion</a>
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

export default connect(mapStatetoProps) (Navegacion);

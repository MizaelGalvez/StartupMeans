import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from "firebase";
import swal from 'sweetalert';

import logo from './LogoGrande.png';
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '',
                  pass: ''};

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }


  handleChangeEmail = (event) => this.setState({email: event.target.value })
  handleChangePass = (event) => this.setState({pass: event.target.value })



  ActualizarDato = (event) => {


    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).catch(function(error) {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // ...
    //alert('el error es : ' + error);
    })

    setTimeout(
    function() {
      var user = firebase.auth().currentUser;

      if (user) {
        this.props.dispatch({
          type: 'Usuario_Accion',
          UserValidation:'active',
        })
      } else {
        swal({
            title: "Datos Invalidos",
            text: "Email o Contraseña no coinciden",
            icon: "warning",
            button: "Reintentar o crea tu Cuenta",
          });
      }
    }
    .bind(this),
    1000);




  }

  VentanaRegistro = (event) => {

    this.props.dispatch({
      type: 'Usuario_Accion',
      UserValidation:'register',
    })

  }




  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <img src={logo} className="Login-logo" alt="logo" />
          <h1 className="Login-title">Iniciar Sesion</h1>
        </header>

        <div>
          <input className="usuario_IS" type="text" value={this.state.email} onChange={this.handleChangeEmail} required placeholder="  Usuario" />
        </div>

        <div>
          <input className="Contraseña_IS" type="password" value={this.state.pass} onChange={this.handleChangePass} required placeholder="  password" />
        </div>

        <div>
          <a className="boton_personalizado_IS" onClick={this.ActualizarDato}>Iniciar Sesion</a>
        </div>

        <div>
          <p className="Login-crearCuenta_IS">o crea tu cuenta<a className="Login-aqui" onClick={this.VentanaRegistro}> aqui </a>!!</p>
        </div>
      </div>
    );
  }
}


export default connect()(Login);

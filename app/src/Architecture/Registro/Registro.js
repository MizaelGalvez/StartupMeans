import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from "firebase";
import QrReader from 'react-qr-reader';
import swal from 'sweetalert';

import logo from './LogoGrande.png';
import './Registro.css';

class Registro extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  App: 'EnCo',
                  email: '',
                  pass: '',
                  Repetirpass: '',
                  delay: 100,
                  result: '',
                  };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }


  handleChangeEmail = (event) => this.setState({email: event.target.value })
  handleChangePass = (event) => this.setState({pass: event.target.value })
  handleChangeRepetirPass = (event) => this.setState({Repetirpass: event.target.value })



  RealizarRegistro = (event) => {

    var App = this.state.App;
    var email = this.state.email;
    var password = this.state.pass;
    var confirmarPassword = this.state.Repetirpass;
    var result = this.state.result;
    var ErrorCrear = false;


      if (password !== "" && password === confirmarPassword) {
        if (password.length >= 6) {
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                //  var errorCode = error.code;
                //var errorMessage = error.message;
                ErrorCrear = true;
                // ...
                //alert('el error es : ' + error);
                swal({
                    title: "Algo ocurrio :(",
                    text: error,
                    icon: "error",
                    button: "Reintentar",
                  });
              }).then(function(){

                if (ErrorCrear === false) {

                  firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    // User is signed in.
                    var uid = user.uid;
                    // ...
                  } else {
                    // User is signed out.
                    // ...
                  }

                  if (uid) {

                      firebase.database().ref(App + '/Expositores/' + uid + '/').set({
                        QRExpositor: result,
                        Contador: 0,
                      });
                      console.log(uid);

                  }

                  });
                }
              });

              swal({
                  title: "Registrado !!!",
                  text: "Email y Contraseña registradas",
                  icon: "success",
                  button: "Iniciar Sesion",
                });

              this.enviarLogin();

        }else {
          swal({
              title: "Contraseña Invalida",
              text: "La Contraseña deve contener almenos 6 caracteres",
              icon: "error",
              button: "Re-escribir",
            });
        }



      }else {
        //alert('Contraseñas no Coinciden');
        swal({
            title: "Un Momento !!",
            text: "Las Contraseñas no Coinciden",
            icon: "warning",
            button: "re-escribir",
          });
      }




 }

   enviarLogin(){

     this.props.dispatch({
       type: 'Usuario_Accion',
       UserValidation:'login',

     })

   }

   RegresarLogin = (event) => {
     this.props.dispatch({
       type: 'Usuario_Accion',
       UserValidation:'login',

     })
   }






  render() {
    return (
      <div className="Registro">
        <div className="contenedorRegistro">
            <div>
              <a className="boton_personalizado_IS" onClick={this.RegresarLogin}>Regresar Atras !!</a>
            </div>

            <header className="Registro-header">
              <img src={logo} className="Registro-logo" alt="logo" />
              <h1 className="Registro-title">Registrate</h1>
            </header>

            <div>
              <input type="text" value={this.state.email} onChange={this.handleChangeEmail} required placeholder="  Email" />
            </div>

            <div>
              <input type="password" value={this.state.pass} onChange={this.handleChangePass} required placeholder="  Contraseña" />
            </div>

            <div>
              <input type="password" value={this.state.Repetirpass} onChange={this.handleChangeRepetirPass} required placeholder="  Confirmar Contraseña" />
            </div>


            <div>
              <a className="boton_personalizado_IS" onClick={this.RealizarRegistro}>Registrarse</a>
            </div>
        </div>
        <QrReader
          className="qrimage"
          ref="qrReader1"
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode
        />
      </div>
    );
  }
}

function mapStatetoProps(state, props){
  return {
    //enviar datos de App.js a esta Vista, si es que son necesarios
  }
}

export default connect(mapStatetoProps)(Registro);

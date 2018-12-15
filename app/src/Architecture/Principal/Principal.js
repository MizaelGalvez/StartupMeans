import React, { Component } from 'react';
import {connect} from 'react-redux';
import QrReader from 'react-qr-reader';
import firebase from "firebase";
import swal from 'sweetalert';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

import './Principal.css';
import QRimagen from './LogoGrande.png';

import Navegacion from '../Navegacion/Navegacion';
let Nav = Navegacion;

const Dona = {
	labels: [
		'Clientes',
		'Trabajadores',
		'Administrativos'
	],
	datasets: [{
		data: [15, 6, 2],
		backgroundColor: [
		'#74b90aee',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#74b90aee',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

const DataNewUsers = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [{
      label: 'Proyeccion',
      type:'line',
      data: [15, 25, 29, 34, 40, 42, 46, 60, 80, 80, 95],
      fill: false,
      borderWidth: 5,
      borderColor: '#ff760eee',
      backgroundColor: '#ff760eee',
      pointBorderColor: '#ff760eee',
      pointBackgroundColor: '#ff760eee',
      pointHoverBackgroundColor: '#ff760eee',
      pointHoverBorderColor: '#ff760eee',
    }]
};

const DataUsersLost = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [{
      label: 'Proyeccion',
      type:'line',
      data: [-2, -5, -7, -8, -6, -7, -10, -11, -9, -13, -15],
      fill: false,
      borderWidth: 5,
      borderColor: '#dd0c6fee',
      backgroundColor: '#dd0c6fee',
      pointBorderColor: '#dd0c6fee',
      pointBackgroundColor: '#dd0c6fee',
      pointHoverBackgroundColor: '#dd0c6fee',
      pointHoverBorderColor: '#dd0c6fee',
    }]
};
const DataActiveUsers = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [{
      label: 'Proyeccion',
      type:'line',
      data: [13, 33, 55, 81, 115, 150, 186, 235, 306, 373, 453],
      fill: true,
      borderWidth: 5,
      borderColor: '#74b90aee',
      backgroundColor: '#74b90aee',
      pointBorderColor: '#74b90aee',
      pointBackgroundColor: '#74b90aee',
      pointHoverBackgroundColor: '#74b90aee',
      pointHoverBorderColor: '#74b90aee',
    }]
};

const options5 = {
  maintainAspectRatio: true,
  gridLines: {
                offsetGridLines: true
            },
  legend: {
    display: false,
  },
  elements: {
    line: {
      fill: false
    }
  },
};

const dataUtilidad = {
  labels: ['Sem 16', 'Sem 17', 'Sem 18', 'Sem 19', 'Sem 20', 'Sem 21', 'Sem 22'],
  datasets: [{
      type: 'bar',
      label: 'Ventas',
      data: [1600, 2000, 2600, 2400, 3000, 2800],
      fill: false,
      backgroundColor: '#74b90aee',
      borderColor: '#74b90aff',
      hoverBackgroundColor: '#74b90aff',
      hoverBorderColor: '#74b90aff',
    },{
      type: 'bar',
      label: 'Nomina',
      data: [978, 968, 1134, 1354, 1454, 1598],
      fill: false,
      backgroundColor: '#ff760eee',
      borderColor: '#ff760eee',
      hoverBackgroundColor: '#ff760eff',
      hoverBorderColor: '#ff760eff',
    },{
      type: 'bar',
      label: 'Gastos',
      data: [297, 296, 313, 434, 454, 598],
      fill: false,
      backgroundColor: '#dd0c6fee',
      borderColor: '#dd0c6fee',
      hoverBackgroundColor: '#dd0c6fff',
      hoverBorderColor: '#dd0c6fff',
    }]
};

const Multiple = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [{
      label: 'Proyeccion',
      type:'line',
      data: [1600, 2000, 3600, 4400, 5000, 6000, 6800, 7300, 8465],
      fill: false,
      borderWidth: 5,
      borderColor: '#999999ee',
      backgroundColor: '#999999ee',
      pointBorderColor: '#999999ee',
      pointBackgroundColor: '#999999ff',
      pointHoverBackgroundColor: '#999999ff',
      pointHoverBorderColor: '#999999ff',
    },{
      type: 'bar',
      label: 'Utilidad',
      data: [1600, 2000, 3600, 4400, 5000, 6000],
      fill: false,
      backgroundColor: '#74b90aee',
      borderColor: '#74b90aff',
      hoverBackgroundColor: '#74b90aff',
      hoverBorderColor: '#74b90aff',
    },{
      type: 'bar',
      label: 'Comparacion',
      data: [175, 200, 352, 543, 684, 784, 978, 968, 1134, 1354, 1454, 1598],
      fill: false,
      backgroundColor: '#ff760eee',
      borderColor: '#ff760eee',
      hoverBackgroundColor: '#ff760eff',
      hoverBorderColor: '#ff760eff',
    }]
};

const options = {
  scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        },
  gridLines: {
                offsetGridLines: true
            },
  legend: {
    display: false,
    position: 'bottom',
  },
  elements: {
    line: {
      fill: false
    }
  },
};

const options2 = {
  gridLines: {
                offsetGridLines: true
            },
  legend: {
    display: false,
  },
  elements: {
    line: {
      fill: false
    }
  },
};



class Principal extends Component {

  constructor(props){
      super(props)
      this.state = {
        App: 'EnCo',
        QRExpositor: '',
        delay: 100,
        result: '',
        registros: '',
        Interes: '',
        ErRor: '',
      }


      this.handleScan = this.handleScan.bind(this)
      this.openImageDialog = this.openImageDialog.bind(this)
      this.handleChangeInteres = this.handleChangeInteres.bind(this);
    }

    handleChangeInteres = (event) => this.setState({Interes: event.target.value })



    handleScan(result){
      if(result){

            if (result.substring(0,4) === 'Enco' || result.substring(0,4) === 'Expo') {
              var userId = firebase.auth().currentUser.uid;
              var email = firebase.auth().currentUser.email;
              var cont = 1;
              this.setState({ result: "ID " + result + " Registrado" })
              setTimeout(
              function() {
                  this.setState({result: "",
                                Interes: "",});
              }
              .bind(this),
              2000);

              var interes = this.state.Interes;
              var App = this.state.App;

                return firebase.database().ref(App + '/Expositores/' + userId + '/').once('value').then(function(snapshot) {
                  cont = (snapshot.val().Contador) || 0;
                  cont = cont + 1;

                  firebase.database().ref(App + '/Expositores/' + userId + '/Registrados').push({
                    Registro: result,
                    Interes: interes,
                  });
                  firebase.database().ref(App + '/Expositores/' + userId ).update({
                    Contador: cont,
                    Email: email,
                  });
                  swal({
                      title: "ID Registrado",
                      text:  "ID "+ result,
                      icon: "success",
                      button: "Siguiente",
                    });
                });



            }else {
              //alert("El QR no corrresponde al Evento, Enviar al Registro.  QR escaneado = "+ result);
              swal({
                  title: "QR Erroneo",
                  text: "El QR no corrresponde al Evento, Enviar al Registro.  QR escaneado = "+ result,
                  icon: "error",
                  button: "Siguiente",
                });
            }



      }else {

        this.setState({ ErRor: " Escanear Nuevamente imagen borrosa o brillante" })
        setTimeout(
        function() {
            this.setState({ErRor: ""});
        }
        .bind(this),
        4000);
        swal({
            title: "Muy Borroso o Brillante",
            text:  "Escanear Nuevamente ",
            icon: "warning",
            button: "Reintentar",
          });
      }

    }
    handleError(err){
      console.error(err)
    }
    openImageDialog() {
      this.refs.qrReader1.openImageDialog()
      //<input className='BotonEscanear' type="file" onClick={this.openImageDialog} />
    }



  ActualizarDato = (event) => {
    this.props.dispatch({
      type: 'Usuario_Accion',
      UserValidation:'data',
    })
  }




  render() {


    return (
      <div className='root'>
      {<Nav/>}
          <div className='Principal'>

              <div className='PrimerFila'>

                  <div className='Proyeccion'>
                     <Bar
                      data={DataNewUsers}
                      height={270}
                      width={300}
                      options={options5}
                    />
                  </div>
                  <div className='Proyeccion'>
                     <Bar
                      data={DataUsersLost}
                      height={270}
                      width={300}
                      options={options5}
                    />
                  </div>
                  <div className='Proyeccion'>
                     <Bar
                      data={DataActiveUsers}
                      height={270}
                      width={300}
                      options={options}
                    />
                  </div>

              </div>
              <div className='SegundaFila'>

                  <div className='Proyeccion'>
                     <Bar
                      data={dataUtilidad}
                      height={270}
                      width={300}
                      options={options}
                    />
                  </div>
                  <div>
                      <Doughnut data={Dona}
                      height={270}
                      width={300}
                      options={options}
                      />
                  </div>
                  <div className='Proyeccion'>
                     <Bar
                      data={Multiple}
                      height={270}
                      width={300}
                      options={options2}
                    />
                  </div>

              </div>
          </div>
      </div>

    );
  }
}


export default connect()(Principal);

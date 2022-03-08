import { connection } from "../modules/db.module";
import { UsuarioModel } from "../models/usuario.model";
import { SimulacionModel } from "../models/simulacion.model";
import { renderFile } from "ejs";
import {CorreoService} from '../services/correo'
export class UsuarioController {
  static get = (request: any, response: any) => {
    const hash = request.params.hash
    let query = `SELECT * FROM usuarios WHERE hash = '${hash}' `;
    connection.query(query,(err:any, res:any) => {
      if (err) {
        console.log("error: ", err);
        response.status(200).send(err);
        return;
      }
      if(res.length > 0 ){
        const usuario = new UsuarioModel(res[0]);
        let query = `UPDATE usuarios SET validado = 1 WHERE id = ${usuario.id} `;
        connection.query(query,usuario,(err:any, res:any) => {
          if (err) {
            console.log("error: ", err);
            response.status(500).send(err);
            return;
          }
          query = `SELECT * FROM simuladores WHERE usuario_id = ${usuario.id} ORDER BY id LIMIT 1`;
          connection.query(query, (err:any, res:any) => {
            if (err) {
              console.log("error: ", err);
              response.status(500).send(err);
              return;
            }
            renderFile('./src/view/simulacion.ejs', {usuario,simulador: res[0]}, {}, (err:any, str:any) => {
              if (err) {
                return console.log(err);
              } 
              // CorreoService.enviar(usuario.correo, 'Simulacion de Ganancias con LOKL', str);
            });
            response.status(200).send({usuario, simulacion: res});
          });
        });
      }else{
        response.status(401).send(false);
      }
    });
  }
  static post = (request: any, response: any) => {
    let usuario:UsuarioModel = new UsuarioModel(request.body);
    const simulacion: SimulacionModel = new SimulacionModel(request.body);
    let query = `SELECT * FROM usuarios WHERE correo = '${usuario.correo}' `;
    connection.query(query,(err:any, res:any) => {
      if (err) {
        console.log("error: ", err);
        response.status(200).send(err);
        return;
      }
      if(res.length > 0 ){
        usuario = new UsuarioModel(res[0]);
        simulacion.usuario_id = res[0].id;
        this.crearSimulacion(simulacion,usuario,  response);
      }else{         
        query = `INSERT INTO usuarios SET ? `;
        connection.query(query,usuario,(err:any, res:any) => {
          if (err) {
            console.log("error: ", err);
            response.status(200).send(err);
            return;
          }
          simulacion.usuario_id = res.insertId;
          this.crearSimulacion(simulacion,usuario, response);
        });
      }
      this.validarCorreo(usuario);
    });
  }
  static put = (response: any, request: any) => {

  }

  static validarCorreo = (usuario:UsuarioModel) => {
    if(!usuario.validado){
      let url = process.env.FROT_URL+'simulador/'+usuario.hash;
      renderFile('./src/view/correo.ejs', {usuario, url}, {}, (err:any, str:any) => {
        if (err) {
          return console.log(err);
        } 
        CorreoService.enviar(usuario.correo, 'Valida tu correo con LOKL', str);
      });
    }
  }

  static crearSimulacion = (simulacion: SimulacionModel, usuario: UsuarioModel,response:any) => {
    let query = `INSERT INTO simuladores SET ? `;
    connection.query(query, simulacion, (err:any, res:any) => {
      if (err) {
        console.log("error: ", err);
        response.status(200).send(err);
        return;
      }

      response.status(200).send({ usuario, simulacion });
      return;
    });
  } 
}
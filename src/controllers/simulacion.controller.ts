import { Router } from "express";
import { connection } from "../modules/db.module";
import { createHash } from "crypto";
import { renderFile } from "ejs";
import { SimulacionModel } from "../models/simulacion.model";
import { CorreoService } from "../services/correo";

export class SimulacionControlller {
  static get = (response: any, request: any) => {
    const hash = request.params.hash
    request.send("OK");
  }

  static post = (response: any, request: any) => {
    const simulacion = new SimulacionModel(request.body);
    const usuario = {};
    const query = `INSERT INTO simuladores ? `;
    connection.query(query, simulacion, (err:any, res:any) => {
      if (err) {
        console.log("error: ", err);
        request.status(200).send(err);
        return;
      }
      renderFile('./src/view/simulacion.ejs', {usuario,simulador: res[0]}, {}, (err:any, str:any) => {
        if (err) {
          return console.log(err);
        } 
        // CorreoService.enviar(usuario.correo, 'Simulacion de Ganancias con LOKL', str);
      });
      request.status(200).send({ id: res.insertId, ...res.body });
    });
  }

  static put = (res: any, req: any) => {

  }
  
}
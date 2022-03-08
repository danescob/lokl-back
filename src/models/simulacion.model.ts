import crypto from 'crypto';

export class SimulacionModel {
  valor: number|null;
  living: number |null;
  periodo: number|null;
  porcentaje: number|null;
  hash: string;
  usuario_id: number|null;

  constructor(data:any){
    this.valor = data.valor??null;
    this.living = data.living??null;
    this.periodo = data.periodo??null;
    this.porcentaje = data.porcentaje??null;
    this.usuario_id = data.usuario_id??null;
    this.hash = data.hash??crypto.randomBytes(16).toString("hex");
  }
}
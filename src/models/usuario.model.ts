import crypto from 'crypto';

export class UsuarioModel {

  id: number|null;
  correo: string|null;
  hash: string|null;
  validado: boolean;

  constructor(user: any){
    this.id = user.id??null;
    this.correo = user.correo??null;
    this.hash = user.hash??crypto.randomBytes(16).toString("hex");
    this.validado = user.validado??false;
  }
}
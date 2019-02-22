import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

constructor(
  private messageService: MessageService,
) { }

public mensaje_generico(key :string, tipo :string, titulo :string, detalle :string) :any{
  return this.messageService.add({ key: key, severity: tipo, summary: titulo, detail: detalle });
}

public confirmacion_eliminacion(dato :string) :any{
  this.messageService.clear();
  return this.messageService.add({ key: 'msj-ng-in-product-list-confirmation', sticky: true, severity: 'warn', summary: "Está por eliminar el registro " + dato + " permanentemente", detail: "¿Desea continuar?" });
}

public clear(key :string){
  this.messageService.clear(key);
}

}

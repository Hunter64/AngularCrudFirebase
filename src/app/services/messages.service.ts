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


}

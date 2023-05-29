import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatsFilter'
})
export class ChatsFilterPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (texto === ''){
      return lista;
    }
    texto = texto.toLowerCase();
    return lista.filter(
      item => item['users.appliant.username'].toLowerCase().includes(texto) || item['users.contractor.username'].toLowerCase().includes(texto)
    );
  }

}

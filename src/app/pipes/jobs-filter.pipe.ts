import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobsFilter'
})
export class JobsFilterPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (texto === ''){
      return lista;
    }
    texto = texto.toLowerCase();
    return lista.filter(
      item => item['name'].toLowerCase().includes(texto) || item['description'].toLowerCase().includes(texto)
    );
  }

}

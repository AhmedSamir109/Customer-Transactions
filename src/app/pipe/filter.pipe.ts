import { Pipe, PipeTransform } from '@angular/core';
import { CustomerTransaction } from '../interface/transactions';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(TransactionArr: CustomerTransaction[] , Selected:number):CustomerTransaction[] {
    if(Selected == 0){
      return TransactionArr

    }else{

      return TransactionArr.filter( T => T.customer_id == Selected  ) ;

    }
}

}

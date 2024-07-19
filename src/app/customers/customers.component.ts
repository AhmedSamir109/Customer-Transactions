import { Component, SimpleChanges } from '@angular/core';
import { Customer } from '../interface/customers';
import { CustomerTransaction, Transaction } from '../interface/transactions';
import { DataService } from '../services/data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customers :Customer [] = [];
  transactions:Transaction[]=[];
  

  selectedCustomer : number = 0 ;   //store the id of selected customer 
  hide:boolean =false ;            // to show chart when select on customer 


  TransactionsWithCustomersName:CustomerTransaction[]=[];    //new array with customer name in every object 
  constructor(private _DataService:DataService){}

  ngOnInit(): void {


    //forkjoin completes only when all observables have completed , before moving on to the next operation in code 
    forkJoin([
      this._DataService.getCustomrs(),
      this._DataService.getTransations()
    ]).subscribe(([customers, transactions]) => {
      this.customers = customers;
      this.transactions = transactions;

      // console.log(customers , transactions);
      
  
      //assign the new array to TransactionsWithCustomersName 
      this.TransactionsWithCustomersName = this.getTransactionsWithCustomersName();
      // console.log(this.TransactionsWithCustomersName);
    });

  }

   getTransactionsWithCustomersName():CustomerTransaction[]{
      return this.transactions.map((transaction) =>  {
      
          const customer = this.customers.find( c => c.id == transaction.customer_id )
          // console.log(customer);
      
          return {...transaction , name:customer? customer.name:'' } 
    });

  }


  changeData(e:any){

    if(e.target.value == 0){
      this.hide = false
    }else{
      this.hide=true
    }
  }


 
}

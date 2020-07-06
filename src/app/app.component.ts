import { Component } from '@angular/core';
import { Observable, Subscription, observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observableapp';
  divisibleByThree : Observable<{isDivisibleByThree: false, number:0}>


  obj: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(filter( v => v % 2 === 0), map( v => v * 10));


  firstSubscription: Subscription;
  subscriberValueOne : number;
  isDivisibleByOne: boolean;

  ngOnInit(){
    this.divisibleByThree = Observable.create((observer)=>{

      let number = 0;
      setInterval(() => {
        if(number%3 == 0){
          observer.next({isDivisibleByThree: true, number : number});
        }
        else{
          observer.next({isDivisibleByThree: false, number : number});

        }
        number++;

  
      }, 1000);


    });

    this.obj.subscribe(
      next => console.log('next:', next),
      err => console.log('error:', err),
      () => console.log('Completed'),
    );

  }

  subscribe(){
    this.firstSubscription = this.divisibleByThree.subscribe({next : (value) => {

      console.log(`Subscriber 1 - number: ${value.number}  
         ${value.isDivisibleByThree? 'is' : 'is not'} divisible by three`);
         this.subscriberValueOne = value.number;
         this.isDivisibleByOne = value.isDivisibleByThree;


    }


    });

  }

  

  unsubscribe(){
    this.firstSubscription.unsubscribe();
    console.log('unsubscribe');
  }
  

 



}

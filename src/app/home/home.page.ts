import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    userId : any;
    to : any[]=[];
    format : any;

  constructor( public firebaseService: FirebaseService) {

     this.firebaseService.get_Formations().subscribe((res:any)=> {

        this.format = res.map(e => {
          return {
            id : e.payload.doc.id,
            Title : e.payload.doc.data()['Title'],
            prix : e.payload.doc.data()['prix'],
            duree : e.payload.doc.data()['duree'],
            description : e.payload.doc.data()['description'],

          }
        })
        console.log(this.format);

    },(err:any)=> {
      console.log(err);
    })
  }

    ngOnInit() {}

    

  }
 
  


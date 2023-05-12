import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss'],
})
export class SavePage implements OnInit {

  today : number = Date.now();

 Title: string;
 prix : string;
 duree : string;
  id:any;
  description : string;

  constructor( private route : ActivatedRoute, private firebaseService : FirebaseService) { 

    this.route.params.subscribe((data : any)=>{
      this.id = data.type;
      console.log(data.type);

         this.firebaseService.get_single_Formation(data.type).subscribe((data : any) => {
         this.Title = data.Title;
        this.prix = data.prix;
        this.duree = data.duree;
        this.description = data.description;

        console.log(data);
      })
    })
  }

  ngOnInit() {
  }

}

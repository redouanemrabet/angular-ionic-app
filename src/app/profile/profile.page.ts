import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    userLogged : string;
    today : number = Date.now();

   

  constructor(  private firebaseService : FirebaseService,
     private navCtrl : NavController,
     private loading : LoadingController,
     ) 
     { 

     this.firebaseService.getAuth().subscribe((auth) => {

          this.userLogged = auth.email;

     })
  }

  ngOnInit() {
  }

  async toFormation(){
    
    let l = this.loading.create({
        message: "Loading...",
         duration: 5000
      });
      (await l).present();
     

        this.navCtrl.navigateRoot("affiche");

        (await l).dismiss();
    

  }


     toOut(){
       console.log("out")
           this.firebaseService.grtOuts();
  }

}

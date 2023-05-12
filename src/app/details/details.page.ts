import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  Title : string;
  prix : string;
  duree : string;
  description : string;
  id : any;
  isLoggedIn : boolean = false;

  userLogged : string;

  today : number = Date.now();

  constructor( private route : ActivatedRoute,
    private firebaseService : FirebaseService,
    public alertController: AlertController,
    private store : AngularFirestore,
    private router : Router
    ) { 

    this.route.params.subscribe((data : any) => {
      this.id = data.type;
      console.log(data.type);

      this.firebaseService.get_single_Formation(data.type).subscribe((data : any) => {
        console.log(data);
        this.Title = data.Title;
        this.prix = data.prix;
        this.duree = data.duree;
        this.description = data.description;
      })
    })
  }

 async ngOnInit() {
    this.firebaseService.getAuth().subscribe((auth) => {
      if (auth) {
        this.userLogged = auth.email;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

  }
  
  
  async presentAlert(id) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Do you want to enroll in a '+this.duree+' '+this.Title+' course with an amount '+ this.prix +'?',
      
     //message: this.Title,
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

            console.log('Confirm Cancel');
          }

        }, {
          text: 'Ok',
          handler:async(res) => {
            
            this.store.collection('mycourses').add({
              email: this.userLogged,
              course: this.Title,
              prix: this.prix,
              duree : this.duree,
              description : this.description,
              

              
            }),

            console.log('Confirm : ')

              this.router.navigateByUrl('save/'+id);
          }
        
        }] 
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  


}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'formation';

  UserColliction = 'mycourses';
  
   userId : string;
  constructor( private firestore : AngularFirestore,
    private ngFireAuth :AngularFireAuth,
     private navCtrl : NavController,
   
   
    
    ) { }

  get_Formations(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  add_formations(data){
    return this.firestore.collection(this.collectionName).add(data);
  }

  get_Formation(id){

return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }


  get_single_Formation(id){

    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }

 getAuth() {
    return this.ngFireAuth.authState.pipe(map((auth) => auth));
  }

  grtFormationDunUser(){
      
      return this.firestore.collection(this.UserColliction).snapshotChanges();
  }

  grtOuts(){
    return this.ngFireAuth.signOut().then(() => {
      this.navCtrl.navigateRoot("login")
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;
   type : boolean = true;


  constructor(private tst : ToastController,
    private loading : LoadingController,
    private ngFireAuth :AngularFireAuth,
    private navCtrl : NavController) { }

  ngOnInit() {
  }

   async Registre(user : User){
 
    if(this.Validation()){

      let l = this.loading.create({
        message: "Loading..."
      });
      (await l).present();

        try{
         await this.ngFireAuth.createUserWithEmailAndPassword(user.email, user.password).then(data => {
           console.log(data);


           //redirectTo Home page
           this.navCtrl.navigateRoot("home");
         });

        }
        catch(e){this.showToast(e)};

        (await l).dismiss();
 
    }

  }

  Validation(){
    if(!this.user.email){
      this.showToast("Enter email !!")
      return false;
    }

    if(!this.user.password){
      this.showToast("Enter password !!")
      return false;
    }

    return true;
  }


  showToast(message: string) {
    this.tst.create({
      message: message,
      duration: 3000

    }).then(toastData => toastData.present());
  }

  Clear(){
    this.user.email = '';
    this.user.password = '';

  }

   fblogin(){}

  twlogin(){}

  glogin(){}


changeType(){
this.type = !this.type;
}

}

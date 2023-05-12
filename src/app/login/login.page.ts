import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  type : boolean = true;

  constructor(private tst : ToastController,
    private loading : LoadingController,
    private ngFireAuth :AngularFireAuth,
    private navCtrl : NavController,
    ) { }

  ngOnInit() {

    this.ngFireAuth.onAuthStateChanged((user)=>{
      console.log(user);
    })
  }

  async LogIn(user : User) {

    if(this.Validation()){
      let l = this.loading.create({
        message: "Loading..."
      });
      (await l).present();

      try{

        await this.ngFireAuth.signInWithEmailAndPassword(user.email, user.password).then(data => {

            console.log(data);
            this.navCtrl.navigateRoot("home");


        });
      }  catch(e){this.showToast(e)};

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
      duration: 30000

    }).then(toastData => toastData.present());
  }


  changeType(){
    this.type = !this.type;
  }

  goToForget(){

  }

  fblogin(){}

  twlogin(){}

  glogin(){}


}

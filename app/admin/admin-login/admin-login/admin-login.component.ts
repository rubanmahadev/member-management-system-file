import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { findIndex } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {


  cred: FormGroup


  constructor(private router: Router, private service: AppService) { }

  ngOnInit() {

    this.cred = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })


  }


  login() {
    console.log(this.cred.value)
    if (this.cred.valid) {
      this.service.getuserid().subscribe((res) => {
        if (this.cred.value['username'] == res[0]['username'] && this.cred.value['password'] == res[0]['password']) {
          console.log("success")
          this.router.navigate(['/admin']);
        }
      })
    }
  }

  forgotpass() {

  }

}

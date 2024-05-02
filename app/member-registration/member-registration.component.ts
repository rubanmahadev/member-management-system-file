import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../service/app.service';
// import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss'],
})
export class MemberRegistrationComponent {
  myDate: Date = new Date();
  currentDate: string = moment().format('DD-MM-YYYY');
  plan: any = [];
  category: any = [];
  age: number;
  registeredid: string;
  expirydate: string;
  data: any = [];

  registrationform: FormGroup;

  constructor(private service: AppService) { }

  ngOnInit() {
    console.log(this.currentDate, 'current');
    console.log(this.myDate, 'mydate'); // date

    this.registrationform = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      aadharid: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      age: new FormControl(null),
      gender: new FormControl(null, Validators.required),
      category: new FormControl(null),
      plan: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      payconfirmation: new FormControl(),
    });

    this.service.getplan().subscribe((res) => {
      this.plan = res;
    });
    // this.service.getcategory().subscribe((res) => {
    //   this.category = res;
    // });

    // this.registrationform.get('amount').disable();
  }

  // amount(event, amount) {
  //   this.registrationform.get('plan').setValue(amount)
  // }

  agecalc(event: Event) {
    let age = this.registrationform.get('dob').value;
    var y = new Date(age);
    var z = new Date();
    var s = z.getTime() - y.getTime();

    var new2 = Math.ceil(s / (24 * 60 * 60 * 1000));
    this.age = Math.trunc(new2 / 365);
  }

  enddate(event: Event) {
    let a = this.registrationform.get('plan').value.split("&&")
    console.log(a[1])
    let temp: number = parseInt(a[0]);

    let myDate = new Date();
    myDate.setMonth(myDate.getMonth() + temp);

    let day = myDate.getDate();
    let day1 = day < 10 ? '0' + day : day;
    let month = myDate.getMonth() + 1;
    let month1 = month < 10 ? '0' + month : month;
    let year = myDate.getFullYear();

    this.expirydate = day1 + '-' + month1 + '-' + year;

    this.registrationform.get("amount").setValue(a[1])

  }



  register() {
    this.registrationform.markAllAsTouched()
    if (this.registrationform.valid) {
      let data = {
        id: '',
        firstname: this.registrationform.value['firstname'],
        lastname: this.registrationform.value['lastname'],
        aadharid: this.registrationform.value['aadharid'],
        gender: this.registrationform.value['gender'],
        address: this.registrationform.value['address'],
        contact: this.registrationform.value['contact'],
        email: this.registrationform.value['email'],
        dob: this.registrationform.value['dob'],
        age: this.age,
        category: this.registrationform.value['category'],
        plan: this.registrationform.value['plan'],
        amount: this.registrationform.value['amount'],
        payconfirmation: this.registrationform.value['payconfirmation'],
        joindate: this.currentDate,
        expirydate: this.expirydate,
        freeze: false,
      };
      this.service.post(data).subscribe((res) => {
        this.data.push(res);
        console.log(this.data);
        this.registeredid = res['id'];
        Swal.fire({
          icon: 'success',
          html: `<h1>Member Registered Successfully</h1><br><h2>${this.registeredid}<h2>`,
          background: '#b11313',
        });
      });
      this.registrationform.reset();
    } else {
      console.log("invalid")
    }
  }
}

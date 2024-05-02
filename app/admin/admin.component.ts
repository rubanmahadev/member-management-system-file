import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AppService } from '../service/app.service';
import { filter } from 'rxjs';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  date = new Date();
  day = Number(
    this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate()
  );
  month = Number(
    this.date.getMonth() + 1 < 10
      ? '0' + this.date.getMonth() + 1
      : this.date.getMonth() + 1
  );
  year = Number(this.date.getFullYear());
  currentDate: string = moment().format('DD-MM-YYYY');
  datas: any = [];
  total: number;
  present: number;
  presentpercet: any = [];
  data1: any;
  data2: any; // freeze date usage
  data3: any; //unfreeze
  dummyexp: any = [];
  filter = '';
  freezeenddate: any;

  data4: any

  form: FormGroup;
  expirydate: string;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.getall();
    // location.reload()

    this.form = new FormGroup({
      nums: new FormControl(null),
      selecteddays: new FormControl(''),
    });
  }

  selectdays(event) {
    if (this.form.value['selecteddays'] == 'day') {
      // this.day = this.day += Number(this.form.value['days'])
      this.date.setDate(this.date.getDate() + Number(this.form.value['nums']));
      let day = this.date.getDate().toString().padStart(2, '0');
      let month = (this.date.getMonth() + 1).toString().padStart(2, '0');
      let year = this.date.getFullYear();

      this.freezeenddate = day + '-' + month + '-' + year;
    }
    if (this.form.value['selecteddays'] == 'week') {
      let week = 7;
      let x1 = Number(this.form.value['nums']);
      let z = week * x1;
      this.date.setDate(this.date.getDate() + z);
      let day = this.date.getDate().toString().padStart(2, '0');
      let month = (this.date.getMonth() + 1).toString().padStart(2, '0');
      let year = this.date.getFullYear();

      this.freezeenddate = day + '-' + month + '-' + year;
    }
    if (this.form.value['selecteddays'] == 'month') {
      this.date.setMonth(
        this.date.getMonth() + 1 + Number(this.form.value['nums'])
      );
      let day = this.date.getDate().toString().padStart(2, '0');
      let month = (this.date.getMonth() + 1).toString().padStart(2, '0');
      let year = this.date.getFullYear();

      this.freezeenddate = day + '-' + month + '-' + year;
    }
  }

  getall() {
    this.service.getall().subscribe((res) => {
      this.datas = res;
      this.total = this.datas.length;
      for (let x of this.datas) {
        if (this.datas[0]['freezeenddate'] == this.currentDate) {
          let id = this.datas[0]['id'];
          this.service.getid(id).subscribe((res) => {
            this.data2 = res;
            // console.log(res['freezestartdate'], "exp")
            let expd = res['expirydate'];
            let exdate = res['freezestartdate'];
            let new1date = new Date(expd.split('-').reverse().join('-'));
            let newdate = new Date(exdate.split('-').reverse().join('-')); // invalid date ? because new Date function format is MM:DD:YYYY
            // console.log(newdate, "btw dys")
            let comparedate = this.date.getTime() - newdate.getTime();
            let comparedate1 = Math.ceil(comparedate / (24 * 60 * 60 * 1000));
            console.log(comparedate1);
            new1date.setDate(new1date.getDate() + comparedate1);
            let day = new1date.getDate().toString().padStart(2, '0');
            let month = (new1date.getMonth() + 1).toString().padStart(2, '0');
            let year = new1date.getFullYear();
            let newexpirydate = day + '-' + month + '-' + year;
            let dats = {
              firstname: this.data2.firstname,
              lastname: this.data2.lastname,
              aadharid: this.data2.aadharid,
              gender: this.data2.gender,
              address: this.data2.address,
              contact: this.data2.contact,
              email: this.data2.email,
              dob: this.data2.dob,
              age: this.data2.age,
              category: this.data2.category,
              plan: this.data2.plan,
              amount: this.data2.amount,
              payconfirmation: this.data2.payconfirmation,
              joindate: this.data2.joindate,
              expirydate: newexpirydate,
              freeze: false,
            };
            this.service.postid(id, dats).subscribe((res) => {
              console.log('done', res);
            });
          });

        }
      }
      // Total Members
      this.datas.sort((a, b) => a.firstname.localeCompare(b.firstname));
    });

    this.service.getcount().subscribe((res) => {
      this.present = res[0]['count']; // Present Members
      let bool = true;

      console.log(this.present + '/' + this.total);
      if (bool == true) {
        this.presentpercet = Math.round((this.present / this.total) * 100); // this.presentpercet = Math.round(this.present / this.total * 100) == null ? 0 : Math.round(this.present / this.total * 100)
      }
    });
  }

  // search(event: Event) {

  //   function a2z() {
  //     return this.filter == this.datas
  //   }
  //   const result = this.datas.filter(a2z)
  // }

  freeze(id) {
    this.service.getid(id).subscribe((res) => {
      this.data1 = res;
      // console.log(this.data1, "data")
      let data2 = {
        firstname: this.data1.firstname,
        lastname: this.data1.lastname,
        aadharid: this.data1.aadharid,
        gender: this.data1.gender,
        address: this.data1.address,
        contact: this.data1.contact,
        email: this.data1.email,
        dob: this.data1.dob,
        age: this.data1.age,
        category: this.data1.category,
        plan: this.data1.plan,
        amount: this.data1.amount,
        payconfirmation: this.data1.payconfirmation,
        joindate: this.data1.joindate,
        expirydate: this.data1.expirydate,
        freezestartdate: this.currentDate,
        freezeenddate: this.freezeenddate,
        freeze: true,
      };
      this.service.postid(id, data2).subscribe((res) => { });
    });
  }

  unfreeze(id) {
    this.service.getid(id).subscribe((res) => {
      this.data3 = res;
      let expd = res['expirydate'];
      let exdate = res['freezestartdate'];
      let new1date = new Date(expd.split('-').reverse().join('-'));
      let newdate = new Date(exdate.split('-').reverse().join('-')); // invalid date ? because new Date function format is MM:DD:YYYY
      // console.log(newdate, "btw dys")
      let comparedate = this.date.getTime() - newdate.getTime();
      let comparedate1 = Math.ceil(comparedate / (24 * 60 * 60 * 1000));
      console.log(comparedate1);
      new1date.setDate(new1date.getDate() + comparedate1);
      let day = new1date.getDate().toString().padStart(2, '0');
      let month = (new1date.getMonth() + 1).toString().padStart(2, '0');
      let year = new1date.getFullYear();
      let newexpirydate = day + '-' + month + '-' + year;
      // console.log(this.data1, "data")
      let data2 = {
        firstname: this.data3.firstname,
        lastname: this.data3.lastname,
        aadharid: this.data3.aadharid,
        gender: this.data3.gender,
        address: this.data3.address,
        contact: this.data3.contact,
        email: this.data3.email,
        dob: this.data3.dob,
        age: this.data3.age,
        category: this.data3.category,
        plan: this.data3.plan,
        amount: this.data3.amount,
        payconfirmation: this.data3.payconfirmation,
        joindate: this.data3.joindate,
        expirydate: newexpirydate,
        freeze: false,
      };
      this.service.postid(id, data2).subscribe((res) => { });
    });
  }

  edit(id) {
    this.service.getid(id).subscribe((res) => { });
  }

  delete(id) {
    this.service.deleteid(id).subscribe((res) => { });
    this.getall();
  }
  renewal(id) {
    // let a = this.registrationform.get('plan').value.split("&&")
    // console.log(a[1])
    // let temp: number = parseInt(a[0]);

    let myDate = new Date();  // user input date
    // myDate.setMonth(myDate.getMonth() + temp);

    let day = myDate.getDate();
    let day1 = day < 10 ? '0' + day : day;
    let month = myDate.getMonth() + 1;
    let month1 = month < 10 ? '0' + month : month;
    let year = myDate.getFullYear();

    this.expirydate = day1 + '-' + month1 + '-' + year;

    this.service.getid(id).subscribe((res) => {

      this.data4 = {
        id: res['id'],
        firstname: res['firstname'],
        lastname: res['lastname'],
        aadharid: res['aadharid'],
        gender: res['gender'],
        address: res['address'],
        contact: res['contact'],
        email: res['email'],
        dob: res['dob'],
        age: res['age'],
        category: res['category'],
        plan: res['plan'],
        amount: res['amount'],
        payconfirmation: res['payconfirmation'],
        joindate: res['joindate'],
        expirydate: this.expirydate,
        freeze: res['freeze']
      }

    })


    this.service.postid(id, this.data4).subscribe((res) => { })

    // this.registrationform.get("amount").setValue(a[1])
  }
}

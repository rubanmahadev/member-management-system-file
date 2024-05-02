import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../service/app.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private service: AppService) { }

  registration: boolean = false;
  datas: any = [];
  remainingdays: string = '';
  myDate: Date = new Date();
  currentDate: string = moment().format('DD-MM-YYYY');
  currentTime: string = moment().format('HH:mm:ss');
  date1: string;
  date2: string;
  expirydate: any;
  count: any = [];
  today: any;
  yesterday: any;
  dummyday: any;
  chkrepeatedid: any = [];
  test: any = [];
  r: any = [];
  x: number;
  ps = [1, 1, 2];
  collectedids: any = []

  // btn = document.getElementById("mybtn")
  // modal = document.getElementById("staticBackdrop")

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      regid: new FormControl(null, Validators.required),
      xdate: new FormControl(),
    });

    // let today = new Date();
    // today.setDate(today.getDate() - 1);

    // let day = today.getDate();
    // let day1 = day < 10 ? '0' + day : day;
    // let month = today.getMonth() + 1;
    // let month1 = month < 10 ? '0' + month : month;
    // let year = today.getFullYear();

    // this.yesterday = day1 + '-' + month1 + '-' + year;
    // console.log(this.yesterday)




    this.service.getcount().subscribe((res) => {
      this.dummyday = res[0]['date'];
      console.log(this.dummyday, this.yesterday);
      if (this.dummyday !== this.currentDate) {
        let data = {
          count: 0,
          date: this.currentDate,
        };
        this.service.putcount(100, data).subscribe((res) => { });
        this.service.getallid().subscribe((res) => {
          this.collectedids = res
          for (let data of this.collectedids)
            if (data.id != 101) {
              this.service.deletecolid(data.id).subscribe((res) => {

              })
            }
          // console.log(data.id)
        })
      }
    });
  }

  login() {
    let formvalue = Number(this.form.value['regid']);

    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.service.getid(this.form.value['regid']).subscribe((res) => {
        console.log(res, 'res');
        this.datas.push(res);

        // console.log(Object.keys(this.datas).length);
        // if (Object.keys(this.datas).length > 0) {
        //   alert()
        // }
        // console.log()
        let startdate = this.currentDate;
        let enddate = this.datas[0].expirydate;
        let z = new Date(startdate.split('-').reverse().join('-'));
        let y = new Date(enddate.split('-').reverse().join('-'));
        console.log(z, typeof z, 'start', y);

        let expiry = y.getTime() - z.getTime();
        // console.log('expiry', expiry, 'days');
        this.expirydate = expiry / (24 * 60 * 60 * 1000);
        console.log(this.expirydate);

        if (this.datas.length > 0) {
          this.service.getallid().subscribe((res) => {
            this.r = res;
            // const sidValue: Number = (res as any).sid

            // console.log(sidValue, typeof (sidValue), "s")
            for (let data of this.r) {
              console.log(data.sid, "show");
              this.x = data.sid;
            }
            if (this.x == formvalue || null || '') {
            } else {
              let data1 = {
                sid: formvalue,
              };
              this.service.postallid(data1).subscribe((res) => { // mistake ids repeat 
                this.service.getcount().subscribe((res) => {
                  this.count = res[0]['count'] + 1;
                  let data = {
                    count: this.count,
                    date: this.currentDate,
                  };
                  this.service.putcount(100, data).subscribe((res) => { });

                  console.log(this.count, typeof this.count, 'c');
                });
              });
            }
          });

          if (this.expirydate >= 0) {

            Swal.fire({
              title: 'Welcome',
              width: '400',

              // text: this.datas[0].name,
              html: `<p>${this.datas[0].firstname} ${this.datas[0].lastname}</p> 
               <p>${this.expirydate} Days left</p>`,
              background: 'black',
              confirmButtonColor: 'lightgoldenrodyellow',
              confirmButtonText: 'Ok',
              color: 'lightgoldenrodyellow',
            }).then((result) => {
              this.datas = [];
            });
          } else if (this.expirydate < 0) {

            this.expirydate = Math.abs(this.expirydate)
            Swal.fire({
              title: 'Welcome',
              width: '400',

              // text: this.datas[0].name,
              html: `<p>${this.datas[0].firstname} ${this.datas[0].lastname}</p> 
               <p> Your Pack Expired ${this.expirydate} Days Before</p>`,
              background: 'black',
              confirmButtonColor: 'black',
              confirmButtonText: 'Ok',
              color: 'red',
            }).then((result) => {
              this.datas = [];
            });
          }

        }
      });

      this.form.reset();
    }
  }

  openmodel() {
    // $('#staticBackdrop').modal('show');
  }
}

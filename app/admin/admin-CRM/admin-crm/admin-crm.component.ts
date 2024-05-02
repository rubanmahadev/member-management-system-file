import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-admin-crm',
  templateUrl: './admin-crm.component.html',
  styleUrls: ['./admin-crm.component.scss'],
})
export class AdminCrmComponent {
  datas: any = [];
  totalincome: number;
  date = new Date()


  constructor(private service: AppService) { }

  ngOnInit() {
    this.income();
    // this.sortdate()
    this.chkfunc()
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    const obj = document.getElementById("value");
    animateValue(obj, 100, 0, 5000);
  }

  chkfunc() {
    // debugger
    let chkdate = new Date("2023-10-07")
    let somdate = new Date("2023-10-07")

    if (chkdate.getTime() == somdate.getTime()) {
      console.log("ok")
    }
  }
  //test
  strt = new Date("2023-10-01")
  end = new Date("2023-10-31")
  income() {
    // debugger
    let chkdate = new Date("2023-10-07")
    // let day = chkdate.getDate()
    // let Month = chkdate.getMonth() + 1 < 10 ? "0" + chkdate.getMonth() + 1 : chkdate.getMonth() + 1
    // let year = chkdate.getFullYear()
    // let finaldate = day + "-" + Month + "-" + year
    console.log(chkdate, "chk")
    this.service.getall().subscribe((res) => {
      this.datas = res;
      let a = 0;
      let b = 0
      for (let data of this.datas) {
        a += data['amount'];
        let zx = data['joindate'].split("-").reverse().join("-")
        // console.log(zx)
        let thismonth = new Date(zx)
        if (thismonth.getTime() >= this.strt.getTime() && thismonth.getTime() <= this.end.getTime()) {
          console.log(data['firstname'])
          b += data['amount']
        }
        this.totalincome = a;
        // let jd = data['joindate'].split("-").reverse().join("-")
        // let dat = new Date(jd)
        // if (dat.getTime() == chkdate.getTime()) {
        //   // console.log(data['amount'], "sort")
        //   b += data['amount']
        // }
      }
      console.log(this.totalincome, b)

    });
  }

  sortdate() {

  }



}


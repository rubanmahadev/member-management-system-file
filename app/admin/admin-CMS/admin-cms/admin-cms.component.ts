import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-admin-cms',
  templateUrl: './admin-cms.component.html',
  styleUrls: ['./admin-cms.component.scss'],
})
export class AdminCmsComponent {
  data1: any = [];
  data2: any = [];
  editdata: any = [];

  form: FormGroup;
  editdataid: any;
  updation: boolean = false;
  button: string = 'Add';

  constructor(private service: AppService) { }

  ngOnInit() {
    this.form = new FormGroup({
      plan: new FormControl(),
      duration: new FormControl(),
      amount: new FormControl(),
    });

    this.getplans();
  }

  getplans() {
    this.service.getplan().subscribe((res) => {
      this.data2 = res;
    });
  }

  addplan() {
    if (this.updation == true) {
      this.updateplan();
    } else {
      let data = {
        id: null,
        Plan: this.form.value['plan'],
        Duration: this.form.value['duration'],
        Amount: this.form.value['amount'],
      };
      this.service.addplan(data).subscribe((res) => { });
    }

    this.form.reset();
    this.getplans();
    this.updation = false;
    this.button = 'Add';
  }

  editplan(id) {
    this.updation = true;
    this.button = 'update';
    this.service.editplan(id).subscribe((res) => {
      this.editdataid = res['id'];
      this.form.get('plan').setValue(res['Plan']);
      this.form.get('duration').setValue(res['Duration']);
      this.form.get('amount').setValue(res['Amount']);
    });
    // this.form.get('plan').setValue(this.data1[id])
  }

  updateplan() {
    let data = {
      Plan: this.form.value['plan'],
      Duration: this.form.value['duration'],
      Amount: this.form.value['amount'],
    };
    this.service.updateplan(this.editdataid, data).subscribe((res) => { });
    this.getplans();
  }

  deleteplan(id) {
    this.service.deleteplan(id).subscribe((res) => { });
    this.getplans();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AppService {


  error: boolean = false


  constructor(private http: HttpClient) { }

  //adminlogin

  getuserid() {
    return this.http.get('http://localhost:3000/admincred/')
  }
  createuserid(data) {
    return this.http.post('http://localhost:3000/admincred/', data)
  }
  idmanage(id, data) {
    return this.http.post('http://localhost:3000/admincred/' + id, data)
  }



  getall() {
    return this.http.get('http://localhost:3000/data/')

  }
  getid(id) {
    return this.http.get('http://localhost:3000/data/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            Swal.fire({
              icon: 'error',
              text: "Id Doesn't Exist",
              confirmButtonColor: '#1A1110'


            })
          }
          return throwError(error)
        })
      );


  }

  post(data) {
    return this.http.post('http://localhost:3000/data/', data)
  }
  postid(id, data) {
    return this.http.put('http://localhost:3000/data/' + id, data)
  }

  deleteid(id) {
    return this.http.delete('http://localhost:3000/data/' + id)
  }

  //count
  getcount() {
    return this.http.get('http://localhost:3000/checkin/')
  }

  putcount(id, data) {
    return this.http.put('http://localhost:3000/checkin/' + id, data)
  }

  getallid() {
    return this.http.get("http://localhost:3000/idrepeat/")
  }
  postallid(data) {
    return this.http.post("http://localhost:3000/idrepeat/", data)
  }

  deletecolid(id) {
    return this.http.delete("http://localhost:3000/idrepeat/" + id);
  }

  //count






  //CMS ADMIN
  getcategory() {
    return this.http.get('http://localhost:3000/cmscategory/')
  }


  getplan() {
    return this.http.get('http://localhost:3000/cmsplan/')
  }

  addplan(data) {
    return this.http.post('http://localhost:3000/cmsplan/', data)
  }

  editplan(id) {
    return this.http.get('http://localhost:3000/cmsplan/' + id)
  }

  updateplan(id, data) {
    return this.http.put('http://localhost:3000/cmsplan/' + id, data)
  }

  deleteplan(id) {
    return this.http.delete("http://localhost:3000/cmsplan/" + id)
  }

}

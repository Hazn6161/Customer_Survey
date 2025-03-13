import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginform!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  login(): void {
    this.spinner.show();

    let username = this.loginform.value.username;
    let password = this.loginform.value.password;

    this.spinner.hide();

    this.apiService.login(username, password).subscribe(async (data: any) => {

      //const { value: formValues } =  await Swal.fire({
      // title: "Enter Your Branch & Reagion",
      // allowOutsideClick: false,
      // html: `
      // <label>Branch</label>
      // <input id="swal-input1" class="swal2-input">
      // <label>Region</label>
      // <input id="swal-input2" class="swal2-input">
      // `,
      // focusConfirm: false,
      // preConfirm: () => {
      //   return [
      //     // document.getElementById("swal-input1").value,
      //     // document.getElementById("swal-input2").value
      //   ];
      // }
      //});
      // if (formValues) {
      //   Swal.fire(JSON.stringify(formValues));
      // }
      //this.loginform.reset();
      Swal.fire({
        icon: 'success',
        title: 'You are successfully logged in',
        text: 'Have a Nice Day',
        footer: 'Thank You',
        timer: 1500
      })
      this.router.navigate(['/employee'])
      localStorage.setItem('user', JSON.stringify(data));
    },
      error => {
        Swal.fire({
          icon: 'error',
          //title: 'කරුණාකර මුරපදය සඳහා පරිශීලක නාමය භාවිතා කරන්න. கடவுச்சொல்லுக்கு பயனர் பெயரைப் பயன்படுத்தவும்.',
          title: 'Invalid Username or Password',
          text: 'Please Check the Username and Password are Correct',
          footer: 'Please Contact Me - 0710233087 ( Dinith )'
        })
      });

  }


  // login() {
  //   this.http.get<any>('http://172.20.11.164:504/UserLogin').subscribe(
  //     (res) => {
  //       const user = res.find((a: any) => {
  //         console.log("ffff"+a.username+"   "+this.loginform.value.username)
  //        // if(a.username===this.loginform.value.username && a.password===this.loginform.value.password)
  //         if(a.username===this.loginform.value.username )

  //         {

  //        // console.log(res);
  //        console.log("checkkk"+this.loginform.value.username+"  "+this.loginform.value.password)

  //         return a.username === this.loginform.value.username && this.loginform.value.password
  //         }


  //       });
  //       if (user) {
  //         //alert("Login Successfull")
  //         Swal.fire(
  //           'Login Successfull',
  //           'Have a nice Day !',
  //           'success'
  //         )
  //         //this.loginform.reset();
  //         this.router.navigate(['/employee'])
  //       } else {

  //           Swal.fire({
  //             icon: 'error',
  //             title: 'User not found',
  //             text: 'Something went wrong!',
  //             footer: 'Please Contact Us'
  //             //footer: '<a href="">Why do I have this issue?</a>'
  //           })

  //         //alert('User not found');
  //       }


  //     },
  //     (err) =>
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //         footer: '<a href="">Why do I have this issue?</a>'
  //       })
  //   );
  // }
}

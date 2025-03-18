import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  feedbackForm!: FormGroup;
  selectedFeedback: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService) {

      this.feedbackForm = this.fb.group(
        {
          feedback: ['']
        });

  }

  saveCustomer(value: number) {
    let user = JSON.parse(localStorage.getItem('user') || '');

    let customer = {
      "claimNo" : "null",
      "createdDate" : "",
      "id": "",
      "surveyId": value,
      "surveyLocation": user.slcBrnDesc,
      "surveyType": "FRONT_COUNTER",
      "surveyUsername": user.username,
      "vehicleNo": "null"

    }

    this.api.savecustomer(customer).subscribe((data: any) => {

      Swal.fire({
        title: "Thank You for your feedback",
        imageUrl: "https://i.ibb.co/JjHxXsJH/Thank-You-Emoji.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        icon: "success",
        text: 'Have a Nice Day',
        showConfirmButton: false,
        timer:3000
        
      });
      this.router.navigate(['/customer']);
      let ref = document.getElementById('cancel');
      ref?.click();

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Fill All Data',
        text: 'Something went wrong!',
        footer: 'Please Contact Us - COOP-SDU',
        // footer: '<a href="">Why do I have this issue?</a>',
      })
    }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';           // ⬅️ Add this
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  feedbackForm!: FormGroup;
  selectedFeedback: string = '';
  name: any;
  vehicle!: any;
  id: any;
  searchText: string = '';
  filteredData: any[] = [];
  allVehicleData: any[] = [];
  isLoading = true;
  debounceTimer: any;
  searchText2

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private config: NgSelectConfig,
    private cd: ChangeDetectorRef
  ) {



    this.config.notFoundText = 'Vehicle No not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same 
    // bindValue in most of the place. 
    // You can also override bindValue for the specified template 
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';

    this.feedbackForm = this.fb.group(
      {
        feedback: ['']
      });

    //this.getAllvehicle();


  }
  ngOnInit(): void {
    this.api.getVehicleData().subscribe(
      (data) => {
        console.log('API Data:', data);  // 👈 Log it here
        this.allVehicleData = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Data load error:', error);
        this.isLoading = false;
      }
    );
  }

  toUpperCaseInput(): void {

    if (this.searchText.trim() === '') {
      this.filteredData = [];  // Clear dropdown if input is empty
    }
    // if (this.searchText) {
    else {
      this.searchText = this.searchText.toUpperCase();
      this.onSearch(); // trigger search after uppercase conversion
    }
  }
  selectVehicle(item: any): void {
    this.searchText = item.vehicleNo; // fill input with selected vehicle
    this.filteredData = []; // hide dropdown after selection
  }

  onSearch(): void {
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      const search = this.searchText.toUpperCase();

      const results = this.allVehicleData.filter(vehicle =>
        vehicle.vehicleNo?.toUpperCase().includes(search)
      );

      console.log('Search Text:', search);
      console.log('Matching Results:', results);
      this.filteredData = results.slice(0, 20);
    }, 300);
  }





  //vehicleNos: any [] = [];


  // vehicleNos = [
  //   { name: 'CBA - 7981' },
  //   { name: 'KS - 6012' },
  //   { name: 'BFN - 5051' },
  //   { name: 'ABB - 2156' },
  //   { name: 'BJC - 1263' }
  // ];


  // getAllvehicle() {
  //   this.api.getvehicleno().subscribe((res: any) => {
  //     this.vehicleNos = res
  //   }, (error) => {
  //     console.error("Error fetching vehicle numbers", error);
  //   });
  // }


  saveCustomer(value: number) {
    // Check if searchText is empty
    if (this.searchText.trim() === "") {
        console.log("searchText is empty");
        Swal.fire({
            icon: 'error',
            title: 'Need Your Vehicle No',
            text: 'Please Fill the Vehicle No!',
            // title: 'ඔබගේ වාහන අංකය අවශ්‍යයි',
            // text: 'කරුණාකර වාහන අංකය පුරවන්න !',
            showConfirmButton: false,
            timer: 3000
        });
        return; // Stop execution if searchText is empty
    }

    console.log(this.searchText);

    // Safely parse user data from localStorage
    let userData = localStorage.getItem('user');
    let user = userData ? JSON.parse(userData) : {};

    let customer = {
        "claimNo": null, // Use null instead of string "null"
        "createdDate": "",
        "id": "",
        "surveyId": value,
        "surveyLocation": user.slcBrnDesc || "", // Avoid undefined errors
        "surveyType": "FRONT_COUNTER",
        "surveyUsername": user.username || "",
        "vehicleNo": this.searchText
    };

    // Call API to save customer
    this.api.savecustomer(customer).subscribe(
        (data: any) => {
            Swal.fire({
                title: "Thank You for your feedback",
                imageUrl: "https://i.ibb.co/JjHxXsJH/Thank-You-Emoji.png",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                icon: "success",
                text: 'Have a Nice Day',
                showConfirmButton: false,
                timer: 3000
            });

            // Clear input and navigate
            this.searchText = "";
            this.router.navigate(['/customer']);

            // Close modal if applicable
            let ref = document.getElementById('cancel');
            ref?.click();
        },
        (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Fill All Data',
                text: 'Something went wrong!',
                footer: 'Please Contact Us - COOP-SDU'
            });
        }
    );
}


}

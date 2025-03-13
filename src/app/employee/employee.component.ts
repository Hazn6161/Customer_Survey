import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']

})
export class EmployeeComponent implements OnInit {
  formValue!: UntypedFormGroup;
  paymentForm!: UntypedFormGroup;
  collectionform!: UntypedFormGroup;
  newbusinessform!: UntypedFormGroup;
  newbisform!: UntypedFormGroup;
  //employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  policyData!: any;
  isEdit: boolean = false;
  isEditButtonNameAdd = 'Add';
  isEditButtonName = 'Update';
  username: any;
  branchId: any;
  regionId: any;
  Percode: any;
  id: any;
  policyNo: any;
  policyPayments: any;
  changePassword: any;
  fromdate: any;
  todate: any;
  collctionSums: any;
  chequeNo: any;
  branch: any;
  bank: any;
  chequeNo1: any;
  branch1: any;
  bank1: any;
  plandata!: any;
  bankdetails!: any;


  spinner1 = 'sp1';
  spinner2 = 'sp2';

  paymentTypeBoolean = false;

  @ViewChild('myModalClose') modalClose;
  filteredItems: any;
  items: any;
  searchText: any;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {

    if (this.isEdit) {
      this.isEditButtonName = 'Update';
    } else {
      this.isEditButtonNameAdd = 'Add';
    }
    this.getEmployeeByPercode();
    this.getAllPlan();
    this.getAllBank();


    this.formValue = this.formBuilder.group({

      id: [''],
      name: ['', Validators.required],
      nic: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      statusType: ['', Validators.required],
      status: ['', Validators.required],
      familyDetails: ['', Validators.required],
      typeOfInsurance: ['', Validators.required],
      presentInsurer: ['', Validators.required],
      noOfFamilyMembers: ['', Validators.required],
      noOfChild: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      monthlyExpences: ['', Validators.required],
      remark: ['', Validators.required],
      createdDateTime: ['', Validators.required],
      modifiedDateTime: ['', Validators.required],
      spouseAge: ['', Validators.required],

    });

    this.paymentForm = this.formBuilder.group({

      policyNo: ['', Validators.required],
      policyHolder: ['', Validators.required],
      payAddress: ['', Validators.required],
      cusNic: ['',],
      policyType: ['', Validators.required],
      policyStatus: ['', Validators.required],
      mobileNo: [' ',],
      mobileNo2: ['', Validators.required],
      paymentType1: ['Cash', Validators.required],
      chequeNo1: [({ value: '', disabled: true }), Validators.required],
      bank1: [({ value: '', disabled: true }), Validators.required],
      chequedate1:[({ value: '', disabled: true }), Validators.required],
      paidAmount: ['', Validators.required],
      confirmpaidAmount: ['', Validators.required],
      receiptsCat: ['', Validators.required]

    });

    this.collectionform = this.formBuilder.group({

      fromdate: ['', Validators.required],
      todate: ['', Validators.required]


    });

    this.newbisform = this.formBuilder.group({
      newcuspaln: ['', Validators.required],
      newcustitel: ['', Validators.required],
      newcusname: ['', Validators.required],
      newcusaddres: ['', Validators.required],
      newcusnic: ['', Validators.required],
      newcusdob: ['', Validators.required],
      newcusmobile: ['', Validators.required],
      paymentType: ['Cash', Validators.required],
      chequeNo: [({ value: '', disabled: true }), Validators.required],
      bank: [({ value: '', disabled: true }), Validators.required],
      newbispaidAmount: ['', Validators.required],
      newbisconfirmPaidAmount: ['', Validators.required],
      newcusterm:['', Validators.required],
      newcuscategry:['', Validators.required],
      chequedate:[({ value: '', disabled: true }), Validators.required]
    });


    let user = JSON.parse(localStorage.getItem('user') || '');

    this.username = user.name;
    this.branchId = user.branch;
    this.Percode = user.percode;
  }

  password1;
  show: boolean = false;


  addClick() {
    this.isEdit = false;
    this.formValue.reset();
  }


  // deleteEmployeeDetail(data: any) {
  //   this.api.deleteEmployee(data.id).subscribe(
  //     (res) => {
  //       Swal.fire(
  //         'Record Deleted Successfully',
  //         'Well Done !',
  //         'success'
  //       )
  //       //alert('Employee deleted Successfully');
  //       this.getAllEmployee();
  //     },
  //     (err) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'User not found',
  //         text: 'Something went wrong!',
  //         footer: 'Please Contact Us'
  //         //footer: '<a href="">Why do I have this issue?</a>'
  //       })
  //     }
  //   );
  // }



  onEdit(data: any) {
    this.isEdit = true;
    this.isEditButtonName = 'Upload';
    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['statusType'].setValue(data.statusType);
    this.formValue.controls['nic'].setValue(data.nic);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['monthlyIncome'].setValue(data.monthlyIncome);
    this.formValue.controls['monthlyExpences'].setValue(data.monthlyExpences);
    this.formValue.controls['noOfFamilyMembers'].setValue(data.noOfFamilyMembers);
    this.formValue.controls['presentInsurer'].setValue(data.presentInsurer);
    this.formValue.controls['noOfChild'].setValue(data.noOfChild);
    this.formValue.controls['typeOfInsurance'].setValue(data.typeOfInsurance);
    this.formValue.controls['remark'].setValue(data.remark);
    this.formValue.controls['spouseAge'].setValue(data.spouseAge);

  }

  updateEmployee() {

    let user = JSON.parse(localStorage.getItem('user') || '');

    let employee = {
      "isDeleted": "NO",
      "status": "string",
      "id": this.formValue.value.id,
      "address": this.formValue.value.address,
      "mobile": this.formValue.value.mobile,
      "monthlyExpences": this.formValue.value.monthlyExpences,
      "monthlyIncome": this.formValue.value.monthlyIncome,
      "name": this.formValue.value.name,
      "nic": this.formValue.value.nic,
      "noOfFamilyMembers": this.formValue.value.noOfFamilyMembers,
      "presentInsurer": this.formValue.value.presentInsurer,
      "remark": this.formValue.value.remark,
      "statusType": this.formValue.value.statusType,
      "noOfChild": this.formValue.value.noOfChild,
      "typeOfInsurance": this.formValue.value.typeOfInsurance,
      "spouseAge": this.formValue.value.spouseAge,
      "modifyedBy": user.percode,
      "branchId": user.branch,
      "regionId": user.regonid

    }

    this.api.updateEmployee(employee).subscribe((data: any) => {

      Swal.fire(
        'Record Updated Successfully',
        'Well Done !',
        'success'
      )
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeeByPercode();

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'User not found',
        text: 'Something went wrong!',
        footer: 'Please Contact Us'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    });


  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  getEmployeeByPercode() {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.api.getuserData(user.percode).subscribe((res) => {
      this.employeeData = res;
    });
  }

  addEmployee() {
    let user = JSON.parse(localStorage.getItem('user') || '');

    let employee = {
      "isDeleted": "NO",
      "status": "string",
      "address": this.formValue.value.address,
      "mobile": this.formValue.value.mobile,
      "monthlyExpences": this.formValue.value.monthlyExpences,
      "monthlyIncome": this.formValue.value.monthlyIncome,
      "name": this.formValue.value.name,
      "nic": this.formValue.value.nic,
      "noOfFamilyMembers": this.formValue.value.noOfFamilyMembers,
      "presentInsurer": this.formValue.value.presentInsurer,
      "remark": this.formValue.value.remark,
      "statusType": this.formValue.value.statusType,
      "noOfChild": this.formValue.value.noOfChild,
      "typeOfInsurance": this.formValue.value.typeOfInsurance,
      "spouseAge": this.formValue.value.spouseAge,
      "createdBy": user.percode,
      "branchId": user.branch,
      "regionId": user.regonid

    }

    this.api.saveEmployee(employee).subscribe((data: any) => {

      Swal.fire(
        'Record Added Successfully',
        'Well Done !',
        'success'
      )
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeeByPercode();

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

  getByPolicyNo() {
    this.spinner.show('sp1');
    let policyNo = this.paymentForm.value.policyNo;

    this.api.getpolicyNo(policyNo).subscribe((res) => {
      this.spinner.hide('sp1');

      if (res.cusName) {
        this.paymentForm.controls['policyHolder'].setValue(res.cusName);
        this.paymentForm.controls['payAddress'].setValue(res.cusAddress);
        this.paymentForm.controls['cusNic'].setValue(res.nic);
        this.paymentForm.controls['policyType'].setValue(res.coverType);
        this.paymentForm.controls['policyStatus'].setValue(res.polStatus);
        this.paymentForm.controls['mobileNo'].setValue(res.mobileNo);
        //this.paymentForm.controls['mobileNo2'].setValue(res.mobileNo);

        this.policyPayments = res.policyPaymentResponses;

        Swal.fire(
          'Data Loading Done',
          '',
          'success'
        );

      }
      else {
        this.spinner.hide('sp1');
        Swal.fire({
          icon: 'error',
          title: 'Invalid Policy No',
          //text: 'Something went wrong!',
          //footer: 'Soryy'
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    });
  }

  getByDaterange() {
    let user = JSON.parse(localStorage.getItem('user') || '');
    let fromdate = this.collectionform.value.fromdate;
    let todate = this.collectionform.value.todate;

    this.api.getByDaterange(user.percode, fromdate, todate).subscribe((res) => {

      if (res && res.length > 0) {

        this.collctionSums = res;


        Swal.fire(
          'Data Loading Done',
          '',
          'success'
        );

      }
      else {

        this.spinner.hide('sp1');
        Swal.fire({
          icon: 'error',
          title: 'No Data Found',
          //text: 'Something went wrong!',
          //footer: 'Soryy'
          // footer: '<a href="">Why do I have this issue?</a>'
        })
        //let ref = document.getElementById('cancel');
        //ref?.click();
        // this.collectionform.reset();
        this.collctionSums = null;
      }

    });



    //console.log(user, fromdate,)

  }


  addPolicyPayment() {

    if (!(this.paymentForm.get('paidAmount')?.value == this.paymentForm.get('confirmpaidAmount')?.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Amount mismatched',
        text: 'Please Check the Amount!'
      })

      let control = this.paymentForm.get('paidAmount');
      //this.getElementById('#confirmpaidAmount').style.borderColor='red'
      control?.invalid && control.touched ? 'red' : 'red';
      return
    }

    if (this.paymentForm.get('mobileNo2')?.value.match(/\d/g).length === 10) {


      if (this.paymentForm.get('paidAmount')?.value > 0) {
        this.spinner.show('sp2');

        let user = JSON.parse(localStorage.getItem('user') || '');

        let policyPay = {

          "createdBy": user.percode,
          "cusAddress": this.paymentForm.value.payAddress,
          "cusName": this.paymentForm.value.policyHolder,
          // "dueDate": "2024-08-29T12:30:09.321Z",
          "mobile": this.paymentForm.value.mobileNo ? this.paymentForm.value.mobileNo : "",
          "modifiedBy": user.percode,
          "newMobile": this.paymentForm.value.mobileNo2,
          "nic": this.paymentForm.value.cusNic,
          // "paidDate": "2024-08-29T12:30:09.321Z",
          "payment": this.paymentForm.value.paidAmount,
          "policyNo": this.paymentForm.value.policyNo,
          "receiptsCategory": this.paymentForm.value.receiptsCat,
          "paymentType":this.paymentForm.value.paymentType1,
          "bank": this.paymentForm.value.bank1,
          "checkDate": this.paymentForm.value.chequedate1,
          "checkNo" : this.paymentForm.value.chequeNo1,

          //"receiptNo": "",
          "status": "ACTIVE",
          "statusType": "Paid",
          "type": this.paymentForm.value.policyType,

        }

        this.api.savePaymentinfo(policyPay).subscribe((data: any) => {
          this.spinner.hide('sp2');

          Swal.fire(
            'Payment Successfully',
            'Good job !',
            'success'
          )
          let ref = document.getElementById('cancel');
          ref?.click();
          this.paymentForm.reset();
          this.paymentForm.controls['paymentType1'].setValue('Cash');
          this.paymentForm.controls['bank1'].disable();
          this.paymentForm.controls['chequeNo1'].disable();
          this.paymentForm.controls['chequedate1'].disable();
          this.policyPayments = null;

        }, error => {
          this.spinner.hide('sp2');
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong!',
            footer: 'Please Contact Us - 0710233087'
          })
        });

      } else {
        //this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Amount is incorect ',
          text: 'Please Check the Amount!',
          //footer: 'Soryy'
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }

    } else {
      //this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Invalid Mobile no format',
        text: 'Please Check the Mobile no !',
        //footer: 'Soryy'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }


  }

  // getByPolicyNo() {
  //   this.spinner.show('sp1');
  //   let policyNo = this.paymentForm.value.policyNo;

  //   this.api.getpolicyNo(policyNo).subscribe((res) => {

  getAllPlan() {

    //this.spinner.show('sp1');
    this.api.getPlan().subscribe((res) => {

      this.plandata = res;
      //this.spinner.hide('sp1');
    });

  }
  getAllBank() {
    this.api.getBankDetails().subscribe((res) => {

      this.bankdetails = res;
    });
  }


  addNewbusiness() {


    if (!(this.newbisform.get('newbispaidAmount')?.value == this.newbisform.get('newbisconfirmPaidAmount')?.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Amount mismatched',
        text: 'Please Check the Amount!'
      })

      let control = this.newbisform.get('newbispaidAmount');
      //this.getElementById('#confirmpaidAmount').style.borderColor='red'
      control?.invalid && control.touched ? 'red' : 'red';
      return
    }

    if (this.newbisform.get('newcusmobile')?.value.match(/\d/g).length === 10) {


    const nicValue = this.newbisform.get('newcusnic')?.value;
    const oldNICRegex = /^\d{9}[vVxX]$/;  // Regex for old NIC format
    const newNICRegex = /^\d{12}$/;    // Regex for new NIC format

    if (!oldNICRegex.test(nicValue) && !newNICRegex.test(nicValue)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid NIC format',
        text: 'Please check the NIC number!'
      });
      return;
    }

    const dobValue = this.newbisform.get('newcusdob')?.value;
      const dobRegex = /^\d{4}-\d{2}-\d{2}$/; // Ensure date format is YYYY-MM-DD
      if (!dobRegex.test(dobValue)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Date of Birth format',
          text: 'Please enter a valid Date of Birth in YYYY-MM-DD format!'
        });
        return;
      }

      // Optional: Check if the age is realistic (e.g., not younger than 18 and not older than 100)
      const today = new Date();
      const birthDate = new Date(dobValue);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {age;// Adjust age if birthday hasn't passed yet this year
      }

      if (age < 18 || age > 100) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Age',
          text: 'The person should be between 18 and 100 years old!'
        });
        return;
      }


      if (this.newbisform.get('newbispaidAmount')?.value > 0) {
        this.spinner.show('sp2');


        let user = JSON.parse(localStorage.getItem('user') || '');

         let newProposal = {

          "planName": this.newbisform.value.newcuspaln,
          "name": this.newbisform.value.newcusname,
          "address": this.newbisform.value.newcusaddres,
          "nic": this.newbisform.value.newcusnic,
          "dateOfBirth": this.newbisform.value.newcusdob,
          "mobileNo": this.newbisform.value.newcusmobile,
          "modifiedBy": user.percode,
          "createdBy": user.percode,
          "bank": this.newbisform.value.bank,
          "checkDate": this.newbisform.value.chequedate,
          "term": this.newbisform.value.newcusterm,
          "title": this.newbisform.value.newcustitel,
          "checkNo": this.newbisform.value.chequeNo,
          "paidAmount": this.newbisform.value.newbisconfirmPaidAmount,
          "paymentType": this.newbisform.value.paymentType,
          "statusType": "Paid",
          "newBusinessCode": "",
          "category":this.newbisform.value.newcuscategry,

        }

         this.api.saveProposalinfo(newProposal).subscribe((data: any) => {
         this.spinner.hide('sp2');

        Swal.fire(
          'Payment Successfully',
          'Good job !',
          'success'
        )

        let ref = document.getElementById('cancel');
        ref?.click();
        this.newbisform.reset();
        this.newbisform.controls['paymentType'].setValue('Cash');
        this.newbisform.controls['bank'].disable();
        this.newbisform.controls['chequeNo'].disable();
        this.newbisform.controls['chequedate'].disable();
        // this.newbisform.reset();
        //this.radios = "cash";
        //this.policyPayments = null;

        }, error => {
          this.spinner.hide('sp2');
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong!',
            footer: 'Please Contact Us - 0710233087'
          })
        });

      } else {
        //this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Amount is incorect ',
          text: 'Please Check the Amount!',
          //footer: 'Soryy'
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    } else {
      //this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Invalid Mobile no format',
        text: 'Please Check the Mobile no !',
        //footer: 'Soryy'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    
  }


  onRadioButtonChange(event: any) {
    const isCashSelected = event.target.value === 'Cash';
    if (isCashSelected) {
      this.newbisform.controls['bank'].disable();
      this.newbisform.controls['chequeNo'].disable();
      this.newbisform.controls['chequedate'].disable();
      this.newbisform.controls['bank'].setValue('');  // Clear the value
      this.newbisform.controls['chequeNo'].setValue('');
      this.newbisform.controls['chequedate'].setValue(''); // Clear the value
    } else {
      this.newbisform.controls['bank'].enable();
      this.newbisform.controls['chequeNo'].enable();
      this.newbisform.controls['chequedate'].enable();
    }
  }

  onRadioButtonChange_pay(event: any) {
    const isCashSelected = event.target.value === 'Cash';
    if (isCashSelected) {
      this.paymentForm.controls['bank1'].disable();
      this.paymentForm.controls['chequeNo1'].disable();
      this.paymentForm.controls['chequedate1'].disable();
      this.paymentForm.controls['bank1'].setValue('');  // Clear the value
      this.paymentForm.controls['chequeNo1'].setValue('');
      this.paymentForm.controls['chequedate1'].setValue(''); // Clear the value
    } else {
      this.paymentForm.controls['bank1'].enable();
      this.paymentForm.controls['chequeNo1'].enable();
      this.paymentForm.controls['chequedate1'].enable();
    }
  }

  clearForms() {

    this.paymentForm.reset();
    this.policyPayments = null;
    this.paymentForm.controls['paymentType1'].setValue('Cash');
    this.paymentForm.controls['bank1'].disable();
    this.paymentForm.controls['chequeNo1'].disable();
    this.paymentForm.controls['chequedate1'].disable();
    //this.collctionSums = null;
    //this.newbisform.reset();

    Swal.fire(
      'Record Clear Done',
      'Well Done !',
      'success'
    )

    Swal.fire(
      'Record Clear Done',
      'Well Done !',
      'success'
    )

  }
  clearcollectionForms() {

    this.collectionform.reset();
    this.collctionSums = null;

    Swal.fire(
      'Record Clear Done',
      'Well Done !',
      'success'
    )

  }

  clearnewbisForms() {

    this.newbisform.reset();
    this.newbisform.controls['paymentType'].setValue('Cash');
    this.newbisform.controls['bank'].disable();
    this.newbisform.controls['chequeNo'].disable();
    this.newbisform.controls['chequedate'].disable();
    //this.collctionSums = null;
    //this.newbisform.reset();

    Swal.fire(
      'Record Clear Done',
      'Well Done !',
      'success'
    )

  }
  

  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === "0") {
      event.preventDefault();
    }
  }

  changepassword() {

    let user = JSON.parse(localStorage.getItem('user') || '');

    let updatepassword = {
      "id": user.id,
      "bucode": user.bucode,
      "percode": user.percode,
      "name": user.name,
      "soflevelcode": user.soflevelcode,
      "sotdesc": user.sotdesc,
      "branch": user.branch,
      "contactno": user.contactno,
      "overrider": user.overrider,
      "address": user.address,
      "brId": user.brId,
      "regonid": user.regonid,
      "zoneid": user.zoneid,
      "pw": this.password1,
      "status": user.status,


    }

    this.api.changepassword(updatepassword).subscribe((data: any) => {



      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Password Changed Done',
        showConfirmButton: false,
        timer: 2000
      })

      this.modalClose.nativeElement.click();
      this.password1 = null;

      // let ref = document.getElementById('cancel');
      // ref?.click();
      // this.paymentForm.reset();
      // this.policyPayments = null;

      // setTimeout(() => {
      //   this.router.navigate(['/employee'])
      // }, 2000);



    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'User not found',
        text: 'Something went wrong!',
        footer: 'Please Contact Us - 0710233087'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    });


  }

  showPassword() {
    this.show = !this.show;
  }


}

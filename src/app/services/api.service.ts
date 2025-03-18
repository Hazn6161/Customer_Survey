import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  apiUrl = environment.BASE_URL;

  constructor(private http:HttpClient) {}
  

  // postEmployee(data:any){
  //   return this.http.post<any>(this.apiUrl + '/CoopLifeProspective', data).pipe(map((res:any)=>{
  //     return res
  //   }))
  // };

  saveEmployee(employee) {
    return this.http.post<any>(this.apiUrl + "/CoopLifeProspective", employee);
  }

  updateEmployee(employee): any{
    return this.http.put(this.apiUrl + "/CoopLifeProspective", employee);
  }

  getEmployee(): any {
    return this.http.get(this.apiUrl + "/CoopLifeProspective",{ responseType: 'json' });
  }

  getuserData(percode): any {
    return this.http.get(this.apiUrl + "/CoopLifeProspective/username/" + percode, { responseType: 'json' });
  }

  getpolicyNo(policyNo): any {
    return this.http.get(this.apiUrl + "/Policy/" + policyNo, { responseType: 'json'});
  }

  savePaymentinfo(policyPay): any {
    return this.http.post<any>(this.apiUrl + "/PolicyPaymentDetails", policyPay);
  }

  saveProposalinfo(newProposal): any {
    return this.http.post<any>(this.apiUrl + "/NewBusiness", newProposal);
  }

  getByDaterange(percode,fromdate,todate):any {
    return this.http.get(this.apiUrl + "/PolicyPaymentDetails/DateRange/" + percode +"/"+ fromdate + "/"+ todate, { responseType: 'json'});
  }

  getPlan(): any {
    return this.http.get(this.apiUrl + "/Plan/",  { responseType: 'json'});
  }

  getBankDetails(): any {
    return this.http.get(this.apiUrl + "/BankDetails/",  { responseType: 'json'});
  }

  // getEmployee(){
  //   return this.http.get<any>("http://172.21.112.112:3000/posts").pipe(map((res:any)=>{
  //     return res
  //   }))
  // };

  

  deleteEmployee(employee){
    return this.http.delete<any>(this.apiUrl + "/CoopLifeProspective", employee)
  }

  login(username, password) {
    //return this.http.get<any>(this.apiUrl + "/UserLogin/" + username + "/" + password).pipe(map((res:any)=>{
      return this.http.get<any>(this.apiUrl + "/General/generalLogin/" + username + "/" + password).pipe(map((res:any)=>{

      
      return res
    }))
  }

  loginUser(username, password) {
    return this.http.get(this.apiUrl + "/PerUser/login/" + username + '/' + password);
  }

  changepassword(updatepassword) {
    return this.http.put(this.apiUrl + "/PerUser", updatepassword);
  }

  

  //172.20.11.162:8001 CustomerSatiseSurvey
  savecustomer(customer) {
    return this.http.post<any>(this.apiUrl + "/CustomerSatiseSurvey", customer);
  }

  getbarchartdata(): any {
    return this.http.get(this.apiUrl + "/CustomerSatiseSurvey/SurveyResult",  { responseType: 'json'});
  }
}

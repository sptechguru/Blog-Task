import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiHandleService } from 'src/app/service/api-handle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm!:FormGroup;

  public roles:any = [
    {name:"User"},
    {name:"Admin",}
  ]

  constructor(public fb:FormBuilder ,public api:ApiHandleService,
    public router:Router) { }

  ngOnInit(): void {
    this.intForm();
  }

  intForm(){
    this.signupForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required, Validators.email],
      password: ['',Validators.required],
      dob: ['',Validators.required],
      role: ['',Validators.required],
    })
  }

  onSubmit(){
    console.log(this.signupForm.value)
    let data = this.signupForm.value;
    alert("submit");
    this.api.postMethod('signup',data).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/blog']);
      this.signupForm.reset();
    }, error=>{
      console.log(error)
    })
  }

}

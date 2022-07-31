import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHandleService } from 'src/app/service/api-handle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(public fb:FormBuilder ,public api:ApiHandleService,
    public router:Router) { }

  ngOnInit(): void {
    this.intForm();
  }

  intForm(){
    this.loginForm = this.fb.group({
       email: ['',Validators.required, Validators.email],
       password: ['',Validators.required],
    })
  }

  onSubmit(){
    console.log(this.loginForm.value)
    let data = this.loginForm.value;
    alert("submit");
    this.api.postMethod('login',data).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/blog']);
      this.loginForm.reset();
    }, error=>{
      console.log(error)
    })
  }

}

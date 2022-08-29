import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHandleService } from 'src/app/service/api-handle.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(public fb: FormBuilder, public api: ApiHandleService,
    public router: Router ,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.intForm();
  }

  intForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.loginForm.value)
    let data = this.loginForm.value;
    this.api.getMethod('signup').subscribe((res) => {
      console.log(res);
      const user = res.find((val:any)=>{
         return val.email === data.email && val.password === data.password;
      })
      if(user){
        this.toastr.success('Login is Succefullly.!');
        this.router.navigate(['/blog']);
      }
      else{
        this.toastr.error("Invalid User Name of Password");
        this.loginForm.reset();
      }
    }, error => {
      this.toastr.error('server Error',error);
    })
  }

}

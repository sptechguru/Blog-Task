import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiHandleService } from 'src/app/service/api-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm!: FormGroup;

  public roles: any = [
    { name: "User" },
    { name: "Admin", }
  ]

  constructor(public fb: FormBuilder, public api: ApiHandleService,
    public router: Router ,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.intForm();
  }

  intForm() {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      dob: ['', Validators.required],
      role: ['', Validators.required],
    })
  }

  onSubmit() {
    let data = this.signupForm.value;
    console.log(data)
    this.api.postMethod('signup', data).subscribe((res) => {
      this.toastr.success('Signup is Succefullly.!');
      this.router.navigate(['/blog']);
      this.signupForm.reset();
    }, error => {
      this.toastr.error('server Error',error);
    })
  }

}

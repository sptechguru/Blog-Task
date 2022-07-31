import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiHandleService } from 'src/app/service/api-handle.service';
import { Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  blogForm!: FormGroup;
  blogList: any = [];
  userId: any;
  btnshow: boolean = true;
  status: any = [
    { staus: "Active" },
    {
      staus: "Inctive",
    }
  ]

  constructor(public fb: FormBuilder, public api: ApiHandleService,
    public router: Router) { }

  ngOnInit(): void {
    this.intForm();
    this.getBlogList();
  }

  intForm() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      descrption: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
    })
  }

  getBlogList() {
    this.api.getMethod("blog").subscribe((res) => {
      // console.log(res);
      this.blogList = res;
    }, error => {
      // console.log(error)
    })
  }

  onSubmit() {
    let payload = this.blogForm.value;
    this.api.postMethod("blog", payload).subscribe((res) => {
      // console.log(res);
      this.blogList = res;
      this.getBlogList();
    }, error => {
      // console.log(error)
    })
  }


  editPost(item: any) {
    this.btnshow = false;
    this.userId = item.id
    // console.log(item)
    this.blogForm.patchValue({
      title: item.title,
      descrption: item.descrption,
      date: item.date,
      status: item.status
    })
  }

  upadatePost() {
    this.api.updateMethod("blog", this.userId).subscribe((res) => {
      // console.log(res);
      this.getBlogList();
    }, error => {
      // console.log(error)
    })
  }

  deletePost(id: any) {
    // alert(id);
    this.api.deleteMethod(id).subscribe((res) => {
      // console.log(res);
      this.getBlogList();
    }, error => {
      // console.log(error)
    })
  }


}

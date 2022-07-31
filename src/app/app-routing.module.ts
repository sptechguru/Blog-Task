import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CrudComponent } from './components/blog/crud/crud.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"" , redirectTo:"/login",pathMatch:"full"},
  {path:"login" , component:LoginComponent},
  {path:"signup" , component:SignupComponent},
  {path:"blog" , component:CrudComponent},
  {path:"**" , component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }

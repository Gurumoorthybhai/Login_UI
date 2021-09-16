import { Role } from "./_models/role";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "./_services";
import { User } from "./_models";

import "./_content/app.less";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent {
  currentUser: User;
  //private currentUserSubject: BehaviorSubject<User>;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    //this.currentUserSubject = new BehaviorSubject<User>(
    //JSON.parse(localStorage.getItem("currentUser"))
    //);
    // this.currentUser = this.currentUserSubject.asObservable();
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      //current_user = x.role.toLowerCase() == "auditor";
    });
  }
  get isAuditor() {
    //.log(this.currentUser && this.currentUser.role === Role.Auditor);
    return (
      this.currentUser &&
      this.currentUser.role.toUpperCase() === Role.Auditor.toUpperCase()
    );
  }

  logout(event) {
    console.log("event", event);
    this.authenticationService
      .logout()
      .pipe(first())
      .subscribe(
        (data) => {
          console.log("Logged out successfully");

          localStorage.removeItem("currentUser");
          //this.currentUserSubject.next(null);
          // this.router.navigate(["/login"]);
          console.log("final");
        },
        (error) => {
          console.log("Error in logging out");
        }
      );
  }
}

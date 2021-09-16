import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "@/_models";
import { UserService, AuthenticationService } from "@/_services";

@Component({
  templateUrl: "audit.component.html",
  // styleUrls: ["./audit.component.css"],
})
export class AuditComponent implements OnInit {
  displayedColumns: string[] = [
    "username",
    "role",
    "loggedin_Time",
    "loggedout_Time",
  ];
  dataSource;
  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService
      .getAuditInfo()
      .pipe(first())
      .subscribe(
        (users) => {
          console.log(users);
          this.dataSource = users;
          // (this.users = users));
        },
        (err) => {}
      );
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "@/_models";

@Injectable({ providedIn: "root" })
export class UserService {
  ipAddress: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getIPAddress();
  }

  getIPAddress() {
    console.log("getIPAddress");
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
    console.log("this.ipAddress", this.ipAddress);
  }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  getAuditInfo() {
    return this.http.get<User[]>(`${config.apiUrl}/users/audit`);
  }

  register(user: User) {
    console.log(`${config} `);
    console.log(`${config.apiUrl}`);
    return this.http.post(`${config.apiUrl}/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/users/${id}`);
  }
}

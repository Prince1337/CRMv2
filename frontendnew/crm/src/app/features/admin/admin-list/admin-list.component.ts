import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { UserResponse } from 'src/app/shared/models/user-response';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  users!: UserResponse[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
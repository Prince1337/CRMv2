import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/http/user.service';
import { UserDetailsResponse } from 'src/app/shared/models/user-details-response';
import { UserResponse } from 'src/app/shared/models/user-response';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent {
  userId!: number;
  user!: UserDetailsResponse; // Stellen Sie sicher, dass Sie die User-Klasse entsprechend importiert haben

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const param=this.route.snapshot.paramMap.get('id');
    this.userId = param?+param:0;; // Die 'id' ist der Pfadparameter, den Sie in der RouterLink-Anweisung festgelegt haben
    this.userService.getUser(this.userId).subscribe((user : UserDetailsResponse) => {
      console.log(user);
      this.user = user;
    });
  }
}

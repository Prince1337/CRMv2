import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/http/user.service';
import { RegisterRequest } from 'src/app/shared/models/register-request';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent {

  userId!: number;
  userForm!: FormGroup;
  roles = ['OWNER', 'MANAGER', 'EMPLOYEE', 'ADMIN'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const param=this.route.snapshot.paramMap.get('id');
    this.userId = param?+param:0;; // Die 'id' ist der Pfadparameter, den Sie in der RouterLink-Anweisung festgelegt haben

    // Benutzerformular erstellen
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });

    // Benutzerdetails abrufen und das Formular vorbelegen
    this.userService.getUser(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });

  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      console.error('invalid');
      return;
    }

      const requestData: RegisterRequest = {
      username: this.userForm.value.username,
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      roles: this.userForm.value.role,
    };

    if (!Array.isArray(requestData.roles)) {
      requestData.roles = [requestData.roles];
    }

    console.log(requestData);

    this.userService.updateUser(this.userId, requestData).subscribe(() => {
      // Erfolgreich aktualisiert, leiten Sie den Benutzer auf die gewünschte Seite weiter
      this.router.navigate(['/users']);
    });
  }

}

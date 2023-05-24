import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error!: string;

  roles = ['OWNER', 'MANAGER', 'EMPLOYEE', 'ADMIN'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.log('Form is not valid');
      return;
    }
    const registerData = { ...this.registerForm.value };
    // Konvertiere das roles-Feld in ein Array, wenn es nicht bereits eins ist
    if (!Array.isArray(registerData.roles)) {
      registerData.roles = [registerData.role];
    }
    
    console.log(registerData);

    this.authService.registerAdmin(registerData).subscribe(
      (response: AuthenticationResponse) => {
        // Handle successful registration
        console.log(response);
        console.log('Registration successful');
      },
      (error) => {
        // Handle registration error
        this.error = error.message;
        console.error(error);
      }
    );
  }
}

interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}
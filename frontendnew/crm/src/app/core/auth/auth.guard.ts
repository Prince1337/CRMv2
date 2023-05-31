import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { RoleResponse } from 'src/app/shared/models/role-response';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUserRole!: string;
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let isAuthenticated : boolean = true;
    this.authService.isAuthenticated$.subscribe((x: boolean) => {
      isAuthenticated = x;
      console.log(`is authenticated: ` + isAuthenticated);
    });
    if (isAuthenticated) {
      const roles = next.data['roles'] as Array<string>; // Zugewiesene Rollen für die Route
      if (roles == null) {
        return of(true);
      }
  
      return this.authService.getUserRole().pipe(
        map((response: RoleResponse) => {
          this.currentUserRole = response.name;
          console.log('AuthGuard Roles include ' + roles.toString());
          console.log(`AuthGuard User role is ${this.currentUserRole}`);
          console.log(roles.includes(this.currentUserRole));
          if (roles.includes(this.currentUserRole)) {
            return true; // Der Benutzer hat Zugriff auf die Route
          } else {
            console.log("You don't have access to this page"); // Der Benutzer hat keine Berechtigung und wird zur "Unauthorized" Seite weitergeleitet
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.authService.getIsAuth();
        console.log('AuthGuard.canActivate - Authentication status:', isAuth);

        if (!isAuth) {
            console.log('AuthGuard - User not authenticated, redirecting to login');
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url }
            });
            return false;
        }

        return true;
    }
}

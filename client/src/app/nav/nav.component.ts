import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppState } from '../app.service';
import { USER_ROLE } from '../shared/constant/user.role';
import { HttpService } from '../shared/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  userRole: String;
  userName: String;
  _USER_ROLE;

  menuItems = ['dashboard', 'sales', 'tasks'];
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private appState: AppState, private httpService: HttpService, private router: Router) {
    this.userRole = appState.get('userData').role == 1 ? 'Admin' : (appState.get('userData').role == 2 ? "Builder" : "Architect");
    this.userName = appState.get('userData').username;
    this._USER_ROLE = USER_ROLE;
  }

  logout(){
    this.httpService.logOutUser().then((result)=>{
      if(result){
        this.router.navigate(['/login']);
      }
    }).catch((result)=>{
      alert("some went wrong");
    });
  }

}

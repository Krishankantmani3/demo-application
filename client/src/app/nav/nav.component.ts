import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppState } from '../app.service';
import { USER_ROLE } from '../shared/constant/user.role';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  userRole: Number;
  _USER_ROLE;

  menuItems = ['dashboard', 'sales', 'tasks'];
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private appState: AppState) {
    this.userRole = appState.get('userData').role;
    this._USER_ROLE = USER_ROLE;
  }

}

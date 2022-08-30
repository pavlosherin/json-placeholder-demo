import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-demo';

  constructor(private readonly _snackBar: MatSnackBar) {
    this._snackBar.open(
      'Server data are not persistent, any change is keeping only in client state and will be lost after refresh page',
      'OK'
    );
  }
}

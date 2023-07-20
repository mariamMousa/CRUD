import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: String, action: String = 'OK') {
    this._snackBar.open(message.toString(), action.toString(), {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}

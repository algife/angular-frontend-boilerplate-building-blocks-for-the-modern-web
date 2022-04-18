import { Component, Inject, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { first } from 'rxjs';

export interface DialogData {
  type: string;
  message: string;
}

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  acceptanceDate: Date | null = null;

  private _dialogConfig: MatDialogConfig<any> = {
    width: '61.8%',
    data: {
      type: 'whatever',
      message: `Are you sure you want to delete?`,
    } as DialogData,
  };

  constructor(public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(DialogInnerContent, this._dialogConfig);

    const backdropClick$ = dialogRef.backdropClick().pipe(first());
    const close$ = dialogRef.afterClosed().pipe(first());

    close$.subscribe((result: any) => {
      console.log(`Dialog result:`, { result });

      if (result === true) {
        // Successful closing (Acceptance)
        this.acceptanceDate = new Date();
      }
      // Otherwise, dialog closed (result is undefined or equal to empty string "")
      console.log(this.acceptanceDate);
    });

    backdropClick$.subscribe((clickEvent) => {
      console.log("User has click outside the dialog, so it's closed now");
    });
  }
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogInnerContent {
  constructor(
    public dialogRef: MatDialogRef<DialogInnerContent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('Data received inside dialog: ', this.data);
  }

  doAction() {
    this.dialogRef.close({
      type: 'Confirm',
      message: 'User has accept the dialog',
    });
  }

  closeDialog() {
    this.dialogRef.close({
      type: 'Cancel',
      message: 'User has cancelled the dialog',
    });
  }
}

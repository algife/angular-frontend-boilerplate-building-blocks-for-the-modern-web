import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent, DialogInnerContent } from './dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: DialogComponent }];
@NgModule({
  declarations: [DialogInnerContent, DialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialogModule {}

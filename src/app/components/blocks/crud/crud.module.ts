import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: CrudComponent }];
@NgModule({
  declarations: [CrudComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCardModule, MatIconModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree.component';

const routes: Routes = [{ path: '', component: TreeComponent }];

@NgModule({
  declarations: [TreeComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TreeModule {}

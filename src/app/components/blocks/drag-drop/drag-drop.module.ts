import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropComponent } from './drag-drop.component';
import { DragDropModule as cdkDragAndDropModule } from '@angular/cdk/drag-drop';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: DragDropComponent }];

@NgModule({
  declarations: [DragDropComponent],
  imports: [CommonModule, cdkDragAndDropModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DragDropModule {}

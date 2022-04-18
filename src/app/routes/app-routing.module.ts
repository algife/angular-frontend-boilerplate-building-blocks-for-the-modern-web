import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { blocksRoutes } from './blocks.routes';

const routes: Routes = [
  // ! FEATURE MODULES AND PAGES
  {
    path: 'blocks',
    // nested routes (sub-routes)
    children: blocksRoutes,
  },

  // ! SPECIAL ROUTES
  // -- Root route
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/blocks',
  },
  // -- Not found
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // Loads the lazy-loading modules in the background to improve UX
      { preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

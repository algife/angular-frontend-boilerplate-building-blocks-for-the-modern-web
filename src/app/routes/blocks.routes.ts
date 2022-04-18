import { Routes } from '@angular/router';

// Feature Module Routes are necessary when lazy loading sub-routes
export const blocksRoutes: Routes = [
  // Root Route
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/blocks/address-form',
  },
  // ! Lazy Loaded sub routes
  // -- module imports are required for that
  // -- // LAZY LOAD - children components lazy loading their modules  (If the user barely access this routes)

  // CRUD-form
  {
    path: 'crud',
    loadChildren: () => import('../components/blocks/crud/crud.module').then((m) => m.CrudModule),
  },
  // autocomplete-form
  {
    path: 'autocomplete-form',
    loadChildren: () =>
      import('../components/blocks/autocomplete-form/autocomplete-form.module').then((m) => m.AutocompleteFormModule),
  },
  // address-form
  {
    path: 'address-form',
    loadChildren: () => import('../components/blocks/address-form/address-form.module').then((m) => m.AddressFormModule),
  },
  // dashboard
  {
    path: 'dashboard',
    loadChildren: () => import('../components/blocks/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // drag-drop
  {
    path: 'drag-drop',
    loadChildren: () => import('../components/blocks/drag-drop/drag-drop.module').then((m) => m.DragDropModule),
  },
  // sidenav
  {
    path: 'sidenav',
    loadChildren: () => import('../components/blocks/sidenav/sidenav.module').then((m) => m.SidenavModule),
  },
  // navigation-schematics
  {
    path: 'navigation-schematics',
    loadChildren: () => import('../components/blocks/navigation/navigation.module').then((m) => m.NavigationModule),
  },
  // dialog
  {
    path: 'dialog',
    loadChildren: () => import('../components/blocks/dialog/dialog.module').then((m) => m.DialogModule),
  },
  // table
  {
    path: 'table',
    loadChildren: () => import('../components/blocks/table/table.module').then((m) => m.TableModule),
  },
  // tree
  {
    path: 'tree',
    loadChildren: () => import('../components/blocks/tree/tree.module').then((m) => m.TreeModule),
  },
];

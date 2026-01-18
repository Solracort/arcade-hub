import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { GameHubComponent } from './pages/game-hub/game-hub.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'hub',
        component: GameHubComponent
      },
      {
        path: 'games',
        component: GameHubComponent
      },
      {
        path: 'game/:id',
        component: GameDetailComponent
      }
    ]
  }
];

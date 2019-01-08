import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { CommunityAnalysisComponent } from './pages/communityAnalysis/communityAnalysis.component';
import { SubmissionsComponent } from './pages/submissions/submissions.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { HomeEnvComponent } from './pages/home-env/home-env.component';
import { MyAsideComponent } from './my-aside/my-aside.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dash-env', component: HomeEnvComponent},
  { path: 'env-export',component:FirstPageComponent},
  { path: 'submissions', component: SubmissionsComponent},
  { path: 'first-page', component: FirstPageComponent},
  { path: 'communityAnalysis', component: CommunityAnalysisComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'home', component: HomeComponent},
  { path: 'map',component: MapComponent},
  { path: 'submissions', component:SubmissionsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    FirstPageComponent,
    CommunityAnalysisComponent,
    SubmissionsComponent,
    SignInComponent,
    HomeComponent,
    MapComponent,
    HomeEnvComponent,
    MyAsideComponent,

  ],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

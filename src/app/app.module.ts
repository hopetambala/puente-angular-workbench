import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { CommunityAnalysisComponent } from './pages/communityAnalysis/communityAnalysis.component';
import { SubmissionsComponent } from './pages/submissions/submissions.component';

const appRoutes: Routes = [
  { path: '', component: SubmissionsComponent},
  { path: 'submissions', component: SubmissionsComponent},
  { path: 'first-page', component: FirstPageComponent},
  { path: 'communityAnalysis', component: CommunityAnalysisComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    FirstPageComponent,
    CommunityAnalysisComponent,
    SubmissionsComponent
  ],
  imports: [
    BrowserModule,
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

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {taskReducer} from "./store/task/task.reducer";
import {TaskEffects} from "./store/task/task.effect";

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    UserComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({tasks: taskReducer}),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

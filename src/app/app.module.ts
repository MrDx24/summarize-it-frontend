import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MySummarizerComponent } from './my-summarizer/my-summarizer.component';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { HomepageComponent } from './homepage/homepage.component';
import { SummarizeUrlComponent } from './summarize-url/summarize-url.component';
import { SummarizeFileComponent } from './summarize-file/summarize-file.component';
import { TutorialpageComponent } from './tutorialpage/tutorialpage.component';

@NgModule({
  declarations: [
    AppComponent,
    MySummarizerComponent,
    HomepageComponent,
    SummarizeUrlComponent,
    SummarizeFileComponent,
    TutorialpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzAlertModule,
    NzNotificationModule

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {IonicStorageModule} from "@ionic/storage-angular";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {ModalJobFormComponent} from "./components/modal-job-form/modal-job-form.component";
import {ModalJobInfoComponent} from "./components/modal-job-info/modal-job-info.component";

@NgModule({
    declarations: [AppComponent, ModalJobFormComponent, ModalJobInfoComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule

    ],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {
}

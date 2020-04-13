import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { AppRoutingModule } from './app-routing.module';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdminComponent } from './admin/admin.component';
import { AlertComponent } from './_components/alert/alert.component';
import { HeaderComponent } from './_components/header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ImageUploadComponent } from './_components/image-upload/image-upload.component';
import { DragAndDropDirective } from './_directives/drag-and-drop.directive';
import { SliderComponent } from './_components/slider/slider.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  threshold: 0,
  spaceBetween: 0,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    AdminComponent,
    AlertComponent,
    HeaderComponent,
    AboutComponent,
    ContactsComponent,
    ImageUploadComponent,
    DragAndDropDirective,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMasonryModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';


const routes: Routes = [
  { path: '',           component: HomeComponent     },
  { path: 'projects',   component: ProjectsComponent },
  { path: 'about',      component: AboutComponent    },
  { path: 'contacts',   component: ContactsComponent },
  { path: 'admin',      component: AdminComponent    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

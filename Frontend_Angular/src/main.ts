import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Trỏ đúng tên file app.ts của mình, không phải app.component.ts nhé

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  template: `
    <p-toast position="bottom-right"></p-toast>
    <router-outlet></router-outlet>
  `,
  providers: [MessageService],
})
export class AppComponent {
  title = 'formJacubitus';
}

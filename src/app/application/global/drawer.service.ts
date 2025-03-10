import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private isOpen = new BehaviorSubject<boolean>(false);
  private drawerContent = new BehaviorSubject<any>(null);
  private drawerTitle = new BehaviorSubject<string>('');
  private drawerData = new BehaviorSubject<any>(null);

  isCollapsed() {
    return this.isOpen.value;
  }

  changeDrawer() {
    this.isOpen.next(!this.isOpen.value);
  }

  openDrawer(title: string, content: any, data?: any) {
    // Clear previous data first
    this.closeDrawer();

    // Then set new data
    this.drawerTitle.next(title);
    this.drawerContent.next(content);
    if (data) this.drawerData.next(data);
    this.isOpen.next(true);
  }

  closeDrawer() {
    this.isOpen.next(false);
    this.drawerContent.next(null);
    this.drawerTitle.next('');
    this.drawerData.next(null);
  }

  getTitle() {
    return this.drawerTitle.asObservable();
  }

  getContent() {
    return this.drawerContent.asObservable();
  }

  getData() {
    return this.drawerData.asObservable();
  }
}

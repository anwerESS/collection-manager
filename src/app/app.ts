import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: 'test',
})
export class App {
  protected readonly title = signal('collection-manager');
}

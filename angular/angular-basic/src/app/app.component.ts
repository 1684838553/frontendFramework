import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./pages/layout/layout.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LayoutComponent]
})

export class AppComponent {
  title = 'angular-test';
  gender = 0;
  catImg = {
    url: '/cat.png',
    alt: 'cat'
  };
  dogImg = {
    url: '/dog.png',
    alt: 'dog'
  };
  customTitle = "自定义文案"
  isPrimary = false;
  alertClass = 'alert alert-primary';
  divStyle = {
    fontSize: '16px',
    color: 'rgb(158, 197, 254)'
  }

  getValue(): number {
    return 23;
  }

  get job(): string {
    return '战士';
  }
}

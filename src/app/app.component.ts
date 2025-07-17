import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderPrivComponent } from "./shared/header-priv/header-priv.component";
import { RouterOutlet } from "@angular/router";
import { HeaderPubComponent } from "./shared/header-pub/header-pub.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderPrivComponent, RouterOutlet, HeaderPubComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeaderPriv$ = new BehaviorSubject<boolean>(false);
  showHeaderPub$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      const url = event.urlAfterRedirects;
      if (url.includes('/login')) {
        this.showHeaderPriv$.next(false);
        this.showHeaderPub$.next(false);
        return;
      }
      const isPriv = url.includes('/login') || url.includes('/dashboard') || url.includes('/home-priv');
      this.showHeaderPriv$.next(isPriv && !url.includes('/quiz') && !url.includes('/comparador') && !url.includes('/home'));
      this.showHeaderPub$.next(!isPriv);
    });
  }
}

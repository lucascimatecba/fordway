import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderPrivComponent } from "./shared/header-priv/header-priv.component";
import { RouterOutlet } from "@angular/router";
import { HeaderPubComponent } from "./shared/header-pub/header-pub.component";
import { FooterPubComponent } from "./shared/footer-pub/footer-pub.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderPrivComponent, RouterOutlet, HeaderPubComponent, FooterPubComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeaderPriv$ = new BehaviorSubject<boolean>(false);
  showHeaderPub$ = new BehaviorSubject<boolean>(false);
  showFooter$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      const currentUrl = event.urlAfterRedirects;

      const isLogin = currentUrl.includes('/login') || currentUrl.includes('cadastro');
      const isPrivado = currentUrl.includes('/dashboard') || currentUrl.includes('/home-priv');

      // Header privado só aparece em páginas internas da Ford
      this.showHeaderPriv$.next(isPrivado);

      // Header e Footer públicos aparecem em qualquer página pública
      const isPublic = !isPrivado && !isLogin;
      this.showHeaderPub$.next(isPublic);
      this.showFooter$.next(isPublic);
    });
  }
}

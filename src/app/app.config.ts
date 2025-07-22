import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCB7i8a7LBBXkpE0IHgVFt25GIlMXpGTNo",
  authDomain: "fordway-db.firebaseapp.com",
  projectId: "fordway-db",
  storageBucket: "fordway-db.appspot.com", // Corrigi o storageBucket
  messagingSenderId: "349895643290",
  appId: "1:349895643290:web:212747f03abe4f8002cf23"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};
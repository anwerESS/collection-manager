import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login-service';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CollectionService } from '../../services/collection-service';

@Component({
  selector: 'app-main-menu',
  imports: [MatButtonModule],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.css',
})
export class MainMenu {

  private readonly LK_SELECTED_COLLECTION = "selectedCollection";

  private readonly loginService = inject(LoginService);
  private readonly collectionService = inject(CollectionService);
  private readonly router = inject(Router);

  protected readonly user = this.loginService.user;

  readonly collections = toSignal(this.collectionService.getAll(), { initialValue: [] });
  readonly selectedCollection = this.collectionService.selectedCollection;

  constructor() {

    effect(() => {
      if (this.collections()?.length) {
        this.loadSelectedCollection();
      }
    });

  }

  logout() {
    this.loginService.logout().pipe(
      takeUntilDestroyed() // automatically unsubscribes from an Observable when the component is destroyed.
    ).subscribe({
      next: () => this.router.navigate(['login']),
      error: () => this.router.navigate(['login']),
    });
  }

  select(selectedCollectionId: number) {
    if (selectedCollectionId) {
      localStorage.setItem(this.LK_SELECTED_COLLECTION, String(selectedCollectionId));
      this.collectionService.get(selectedCollectionId).subscribe(collection => {
        this.selectedCollection.set(collection);
        this.router.navigate(['collection', collection.id]);
      });
    }
  }

  loadSelectedCollection() {
    const storedCollection = localStorage.getItem(this.LK_SELECTED_COLLECTION);
    let identifiedCollection = null;
    if (storedCollection) {
      identifiedCollection = this.collections().find(c => c.id === parseInt(storedCollection));
    }
    identifiedCollection ??= this.collections()[0]; // replace the condition bellow
    // if (!identifiedCollection) {
    //   identifiedCollection = this.collections()[0];
    // }
    if (identifiedCollection.id) {
      this.collectionService.get(identifiedCollection.id).subscribe(collection => {
        this.selectedCollection.set(collection);
        if (this.router.url === '/collection') {
          this.router.navigate(['collection', collection.id]);
        }
      });
    }
  }

}
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection-item-detail',
  imports: [],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css'
})
export class CollectionItemDetail implements OnInit, OnDestroy {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  itemId = signal<number | null>(null);

  routeParamSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.routeParamSubscription = this.route.params.subscribe(params => {
      const selectedId = params['id'] ? parseInt(params['id']) : null;
      this.itemId.set(selectedId);
    })
  }

  next() {
    const nextId = (this.itemId() || 0) + 1;
    this.router.navigate(['item', nextId]);
  }

  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }

}
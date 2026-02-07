import { Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {

  searchButtonClicked: OutputEmitterRef<void> = output<void>();

  searchClick() {
    this.searchButtonClicked.emit();
  }

}
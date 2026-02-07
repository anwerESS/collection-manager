import { Component, model, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {

  search = model("Initial");
  searchButtonClicked: OutputEmitterRef<void> = output<void>({
    alias: 'submit'
  });

  searchClick() {
    this.searchButtonClicked.emit();
  }

}
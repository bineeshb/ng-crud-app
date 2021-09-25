import { Component } from '@angular/core';

import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) { }
}

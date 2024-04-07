import { Component, inject } from "@angular/core";
import { SpinnerService } from "@shared/utils/spinner.service";

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [],
    template: `
    @if(isLoading()) {
        <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-orange-400 border-8 h-64 w-64"></div>
        </div>
    }
    `
  })
  export default class SpinnerComponent {
    private readonly spinnerService = inject(SpinnerService);

    isLoading = this.spinnerService.isLoading;
  } 
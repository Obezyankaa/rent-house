import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HousingLocation } from '../housinglocation';
@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housinglocation.photo"
        alt="photo
      {{ housinglocation.name }}"
      />
      <h2 class="listing-heading">{{ housinglocation.name }}</h2>
      <p class="listing-location">
        {{ housinglocation.city }}, {{ housinglocation.state }}
      </p>
      <a [routerLink]="['/details', housinglocation.id]">Learn more</a>
    </section>
  `,
  styleUrls: ["./housing-location.component.css"],
})
export class HousingLocationComponent {
  @Input() housinglocation!: HousingLocation;
}

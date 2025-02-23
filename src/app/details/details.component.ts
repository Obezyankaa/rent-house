import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { HousingLocation } from "../housinglocation";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        [alt]="housingLocation?.name"
      />
      <section class="listing-description">
        <h2 class="listing-heading">
          {{ housingLocation?.name }}
        </h2>
        <p class="licting-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section>
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply how to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitAplication()">
          <label for="first-name">First name</label>
          <input type="text" formControlName="firstName" id="first-name" />

          <label for="last-name">Last name</label>
          <input type="text" formControlName="lastName" id="last-name" />

          <label for="email">email</label>
          <input type="email" formControlName="email" id="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    })
  }

  submitAplication() {
    this.housingService.submitAplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}

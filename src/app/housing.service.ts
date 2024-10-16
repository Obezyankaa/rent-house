import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: "root",
})
export class HousingService {
  utl = "http://localhost:3000/locations";

  constructor() {}

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.utl);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: Number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.utl}/${id}`);
    return await data.json() ?? [];

  }

  submitAplication(firstName: string, lastName: string, email: string) {
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  }
}

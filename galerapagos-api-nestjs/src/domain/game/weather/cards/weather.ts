export class WeatherCard {
  private name: string;
  private numberOfWater: number;

  constructor(name: string, numberOfWater: number) {
    this.name = name;
    this.numberOfWater = numberOfWater;
  }

  get isHurricane() {
    return false;
  }
}

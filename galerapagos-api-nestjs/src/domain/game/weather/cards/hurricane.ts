import { WeatherCard } from './weather';

export class HurricaneCard extends WeatherCard {
  get isHurricane() {
    return true;
  }
}

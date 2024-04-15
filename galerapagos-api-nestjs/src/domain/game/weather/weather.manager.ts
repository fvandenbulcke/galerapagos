import { HurricaneCard } from './cards/hurricane';
import { WeatherCard } from './cards/weather';

const NUMBER_OF_NULL_WATER = 3;
const NUMBER_OF_ONE_WATER = 3;
const NUMBER_OF_TWO_WATER = 3;
const NUMBER_OF_THREE_WATER = 2;
const NUMBER_OF_HURRICAN = 1;

const createCard = (name: string, numberOfWater: number) =>
  new WeatherCard(name, numberOfWater);

const createCards = (
  numberOfCards: number,
  name: string,
  numberOfWater: number,
): WeatherCard[] => {
  return Array.from({ length: numberOfCards }).map(() =>
    createCard(name, numberOfWater),
  );
};

const shuffle = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export class WeatherManager {
  private weatherCardDeck = [] as WeatherCard[];

  constructor() {
    const deckWithoutHurrican = shuffle([
      ...createCards(NUMBER_OF_NULL_WATER, 'dryness', 0),
      ...createCards(NUMBER_OF_ONE_WATER, 'heat', 1),
      ...createCards(NUMBER_OF_TWO_WATER, 'rain', 2),
      ...createCards(NUMBER_OF_THREE_WATER, 'storm', 3),
    ]);
    const lastFiveCardsWithHurricane = shuffle([
      ...deckWithoutHurrican.slice(7),
      new HurricaneCard('hurricane', 2),
    ]);
    this.weatherCardDeck = [
      ...deckWithoutHurrican.slice(0, 7),
      ...lastFiveCardsWithHurricane,
    ];
  }

  draw(): WeatherCard {
    const weather = this.weatherCardDeck[0];
    this.weatherCardDeck = this.weatherCardDeck.splice(1);
    return weather;
  }
}

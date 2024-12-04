import { en, Faker, generateMersenne53Randomizer } from '@faker-js/faker';

const randomizer = generateMersenne53Randomizer();

const frFaker = new Faker({ locale: en, randomizer });

export default function words(count = 10) {
  return frFaker.word.words(count);
}

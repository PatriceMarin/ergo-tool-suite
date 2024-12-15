import { fr, Faker, generateMersenne53Randomizer } from '@faker-js/faker';

const randomizer = generateMersenne53Randomizer();

const frFaker = new Faker({ locale: fr, randomizer });

export function getWordsSeparatedBySpace(count = 10): string {
  return frFaker.word.words(count);
}

export function getWords(count = 10, minLength = 5, maxLength = 10): string[] {
  return frFaker.helpers.uniqueArray(() => {
    let word;
    do {
      word = frFaker.word.words().toUpperCase(); // Génère un mot
    } while (word.length < minLength || word.length > maxLength); // Vérifie la longueur du mot
    return word;
  }, count);
}

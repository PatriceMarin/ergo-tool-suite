import { fr, Faker, generateMersenne53Randomizer } from '@faker-js/faker';

const randomizer = generateMersenne53Randomizer();

const frFaker = new Faker({ locale: fr, randomizer });

export function getWordsSeparatedBySpace(count = 10): string {
  return frFaker.word.words(count);
}

/**
 * Génère une liste de mots français selon les critères de nombre et de longueur des mots.
 * Exclut les mots contenant des apostrophes.
 * @param {number} count - Nombre de mots à générer.
 * @param {number} minLength - Longueur minimale des mots.
 * @param {number} maxLength - Longueur maximale des mots.
 * @returns {string[]} - Liste des mots générés.
 */
export function getWords(count = 10, minLength = 5, maxLength = 10): string[] {
  return frFaker.helpers.uniqueArray(() => {
    let word;
    do {
      word = frFaker.word.words().split(' ')[0].toLocaleUpperCase('fr-FR'); // Génère un mot
    } while (
      word.length < minLength ||
      word.length > maxLength ||
      word.includes("'")
    ); // Vérifie la longueur du mot et exclut les mots contenant des apostrophes
    return word;
  }, count);
}

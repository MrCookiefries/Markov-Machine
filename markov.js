/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      if (chains[word]) {
        chains[word].push(this.words[i + 1] || null);
      } else {
        chains[word] = [this.words[i + 1] || null];
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    const words = [];
    let word = this.words[Math.floor(Math.random() * this.words.length)];
    words.push(word);
    while (words.length !== numWords) {
      const nextWords = this.chains[word];
      word = nextWords[Math.floor(Math.random() * nextWords.length)];
      if (word) words.push(word);
      else break;
    }
    return words.join(" ");
  }
}

module.exports = {MarkovMachine};

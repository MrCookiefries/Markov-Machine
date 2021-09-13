const { MarkovMachine } = require("./markov");

describe("MarkovMachine class", () => {
    let mm;

    beforeEach(() => {
        mm = new MarkovMachine("the cat in the hat");
    });

    test("creates a chain of words", () => {
        expect(mm.chains).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});
    });

    test("creates random text from words", () => {
        expect(mm.makeText()).toEqual(expect.any(String));
    });
});

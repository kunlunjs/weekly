"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = void 0;
var core_1 = require("@myscope/core");
var sizes = 'small medium large'.split(' ');
var barks = 'Woof Yap Growl'.split(' ');
function createDog() {
    return {
        size: sizes[Math.floor(Math.random() * sizes.length)],
        woof: function () {
            return "".concat(this.name, " says ").concat(barks[Math.floor(Math.random() * barks.length)]);
        },
        name: (0, core_1.makeRandomName)()
    };
}
exports.createDog = createDog;

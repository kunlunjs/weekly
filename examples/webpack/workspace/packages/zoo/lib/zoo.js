"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZoo = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var animals_1 = require("@myscope/animals");
function CreateZoo() {
    var dogs = [
        (0, animals_1.createDog)(),
        (0, animals_1.createDog)(),
        (0, animals_1.createDog)(),
        (0, animals_1.createDog)(),
        (0, animals_1.createDog)(),
        (0, animals_1.createDog)(),
        (0, animals_1.createDog)()
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "List of Dogs1" }, void 0), (0, jsx_runtime_1.jsx)("hr", {}, void 0), dogs.map(function (dog, i) {
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "dog" }, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Dog: ", i, " - Size: ", dog.size, " - Name: ", dog.name] }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["Bark: ", dog.woof()] }, void 0), (0, jsx_runtime_1.jsx)("hr", {}, void 0)] }), i));
            })] }, void 0));
}
exports.CreateZoo = CreateZoo;

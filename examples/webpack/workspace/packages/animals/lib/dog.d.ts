import type { Animal } from './animal';
interface Dog extends Animal {
    woof(): void;
    name: string;
}
declare function createDog(): Dog;
export { Dog, createDog };
//# sourceMappingURL=dog.d.ts.map
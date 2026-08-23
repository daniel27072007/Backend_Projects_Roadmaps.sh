import { hello } from "./hello.js";

test('should say hello and a name input', () => {
    expect(hello('daniel')).toBe('hello daniel');
})
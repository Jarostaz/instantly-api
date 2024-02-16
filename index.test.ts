test('init', () => {
  expect(1).toBe(1);
});

test('dotenv', () => {
  expect(process.env.TEST).toBe('true');
});
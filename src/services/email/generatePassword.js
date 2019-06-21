import generator from 'generate-password';

export default () => {
  const password = generator.generate({
    length: 18,
    numbers: true,
    uppercase: true,
    symbols: false,
  });
  return password;
};

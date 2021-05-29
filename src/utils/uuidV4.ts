const uuidV4 = (): string => {
  const [hexadecimals, delimiterIndex] = ['0123456789abcdef', [8, 13, 18, 23]];
  return Array.from({ length: 36 }, (_, i) =>
    delimiterIndex.includes(i)
      ? '-'
      : hexadecimals[Math.floor(Math.random() * hexadecimals.length)]
  ).join('');
};

export default uuidV4;

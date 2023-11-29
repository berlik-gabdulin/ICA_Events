export const formatPhoneNumber = (input: string) => {
  // Удаляем все символы кроме цифр и знака '+'
  const cleaned = ('' + input).replace(/[^\d+]/g, '');

  // Проверяем, начинается ли строка с '+', если нет - добавляем
  const formatted = cleaned.startsWith('+') ? cleaned : '+' + cleaned;

  return formatted;
};

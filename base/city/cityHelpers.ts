export const isVlaanderen = (postalCode: number) => {
  return (
    (postalCode >= 1300 && postalCode <= 3999) ||
    (postalCode >= 8000 && postalCode <= 9999)
  );
};

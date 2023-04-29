export default async function fetchCountries(name) {
  return await fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
      "?fields=name,capital,population,flags,languages"
  );
}

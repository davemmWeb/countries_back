const axios = require("axios");
const { Country, Activity } = require("../db");

const getSaveCountries = async () => {
  const countries = await Country.findAll({
    attributes: ["id", "name", "imageFlag", "continent", "poblation"],
    include: {
      model: Activity,
    },
  });
  if (countries.length) {
    return countries;
  } else {
    const data = await axios.get("https://restcountries.com/v3/all");
    const Allcountries = data.data;
    Allcountries.forEach((e) => {
      Country.create({
        id: e.cca3,
        name: e.name.common,
        imageFlag: e.flags[1],
        continent: e.continents[0],
        capital: e.capital ? e.capital[0] : "none",
        subregion: e.subregion,
        area: e.area,
        poblation: e.population,
      });
    });
  }
};

const getCountryById = async (id) => {
  const country = await Country.findByPk(id, {
    include: {
      model: Activity,
    },
  });
  if (!country) throw Error("ID not exist");
  else return country;
};

const getCountriesMatch = async (name) => {
  const countries = await Country.findAll({
    where: {
      name: name,
    },
    include: {
      model: Activity,
    },
  });
  if (!countries.length) throw Error("Not match countries");
  else return countries;
};

module.exports = {
  getSaveCountries,
  getCountryById,
  getCountriesMatch,
};

const { Activity, Country } = require("../db");

const createActivity = async (name, difficulty, duration, season) => {
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  return newActivity;
};
const getCountryForActivity = async (id) => {
  const country = await Country.findByPk(id);
  if (!country) throw Error("ID not exist");
  else return country;
};

module.exports = {
  createActivity,
  getCountryForActivity,
};

const { Router } = require("express");
const {
  getSaveCountries,
  getCountryById,
  getCountriesMatch,
} = require("../controllers/countries");

const router = Router();
// GET /countries?name="..."
router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const countries = await getCountriesMatch(name);
      res.status(202).json(countries);
    } catch (error) {
      res.status(404).send("Country not exist");
    }
  } else {
    try {
      const onlyCountries = await getSaveCountries();
      res.status(202).json(onlyCountries);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const country = await getCountryById(id);
    res.status(202).json(country);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

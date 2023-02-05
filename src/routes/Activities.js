const { Router } = require("express");

const { createActivity } = require("../controllers/activities");

const router = Router();

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, idCountries } = req.body;
  if (![name, difficulty, duration, season].every(Boolean))
    return res.status(404).send("Incomplete data");
  try {
    const newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season
    );
    await newActivity.addCountries(idCountries);
    res.status(202).json(newActivity);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

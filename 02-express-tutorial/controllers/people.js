const { people } = require("../data");

const addPerson = (req, res) => {
  return res.json(people);
};

const getPeople = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide a name." });
  }

  people.push({ id: people.length + 1, name });
  return res.status(201).json({ success: true, name });
};

const getPerson = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const person = people.find((person) => person.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `Person with id ${id} not found.` });
  }

  return res.status(200).json({ success: true, person });
};

const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const person = people.find((person) => person.id === id);

  if (!person) {
    return res.status(404).json({ msg: `Person with id ${id} not found.` });
  }

  person.name = name;
  return res.status(200).json({ success: true, person });
};

const deletePerson = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const person = people.find((person) => person.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `Person with id ${id} not found.` });
  }

  const updatedList = people.filter((person) => person.id !== id);

  people.length = 0;
  people.push(...updatedList);

  return res.status(200).json({
    success: true,
    removed: person,
    people,
  });
};

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};

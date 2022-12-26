/* eslint-disable no-underscore-dangle */
const Ajv = require("ajv");
const mainDBHandler = require("../../database/main.handler");
const IDMongo = require("../../database/IDMongo");
const freightSchema = require("../../models/freight");

const ajv = new Ajv();

exports.getAllFreights = async (req, res) => {
  try {
    const result = await mainDBHandler.findAll("freights", {});

    if (!result) {
      res.status(500).json("Error Getting All Freights");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error("Error Getting All Freights.", err);
    res.status(500).send("Error Getting All Freights");
  }
};

exports.getRemovedFreights = async (req, res) => {
  try {
    const result = await mainDBHandler.findAll("removedFreights", {});

    if (!result) {
      res.status(404).json("No Removed Freights found");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error("Error Getting Removed Freights.", err);
    res.status(500).send("Error Getting Removed Freights");
  }
};

exports.createFreight = async (req, res) => {
  try {
    const { body } = req;

    if (!ajv.validate(freightSchema, body)) {
      res.status(400).json("Bad Params Passed");
      return;
    }

    const result = await mainDBHandler.insertOne("freights", body);

    if (!result) {
      res.status(500).json("Error Creating Freight");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error("Error Creating Freight.", err);
    res.status(500).send("Error Creating Freight");
  }
};

exports.editFreight = async (req, res) => {
  try {
    const { body } = req;
    const { _id } = body;

    delete body._id;

    if (!ajv.validate(freightSchema, body)) {
      res.status(400).json("Bad Params Passed");
      return;
    }

    const result = await mainDBHandler.updateOne(
      "freights",
      { _id: IDMongo.ObjectId(_id) },
      body
    );

    if (result.modifiedCount === 0) {
      res.json("No Freights have been Edited");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error("Error Editing Freight.", err);
    res.status(500).send("Error Editing Freight");
  }
};

exports.removeFreight = async (req, res) => {
  try {
    const { body } = req;
    let { ids } = body;

    ids = ids.map((id) => IDMongo.ObjectId(id));

    const result = await mainDBHandler.findAll("freights", {
      _id: { $in: ids },
    });

    if (result.length === 0) {
      res
        .status(404)
        .json("Didn't find any Freights matching the ID's provided");
    } else {
      const date = new Date().toLocaleDateString();
      const removedFreights = result.map((freight) => ({
        name: freight.name,
        type: freight.type,
        weight: freight.weight,
        date,
      }));

      await mainDBHandler.insertMany("removedFreights", removedFreights);
      await mainDBHandler.deleteMany("freights", { _id: { $in: ids } });

      res.json(removedFreights);
    }
  } catch (err) {
    console.error("Error Removing Freight.", err);
    res.status(500).send("Error Removing Freight");
  }
};

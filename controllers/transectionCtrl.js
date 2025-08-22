const transectionModel = require("../models/transectionModel");
const moment = require("moment");

// ✅ GET transactions with frequency, type, and date range
const getAllTransection = async (req, res) => {
  try {
    const { frequency, userId, selectedDate, type } = req.body;

    if (!userId || !frequency) {
      return res.status(400).json({ error: "Missing userId or frequency" });
    }

    // Build MongoDB filter
    let filter = {
      userId,
      ...(type !== "all" && { type }), // Add type if not 'all'
    };

    if (frequency !== "custom") {
      const dateFrom = moment().subtract(Number(frequency), "days").toDate();
      filter.date = { $gte: dateFrom };
    } else if (selectedDate && selectedDate.length === 2) {
      filter.date = {
        $gte: new Date(selectedDate[0]),
        $lte: new Date(selectedDate[1]),
      };
    }

    const transactions = await transectionModel.find(filter).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ POST transaction
const addTransection = async (req, res) => {
  try {
    const data = req.body;
    if (data.date) {
      data.date = new Date(data.date); // ensure proper date format
    }
    const newTransection = new transectionModel(data);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

module.exports = {
  getAllTransection,
  addTransection,
};

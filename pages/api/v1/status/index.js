import database from "../../../../infra/database.js";

const status = async (req, res) => {
  const result = await database.query("SELECT 1;");
  console.log(result);

  res.status(200).json({ message: "ok" });
};

export default status;

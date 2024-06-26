const pool = require("../config/db");
// add solution
exports.createSolution = async (req, res) => {
  try {
    const { content, solution_date } = req.body;
    console.log(req.body);
    const { id_problem, id_user } = req.params;
    const newSolution = await pool.query(
      "INSERT INTO solutionDBMASTER (content,solution_date,id_problem,id_user) values ($1,$2,$3,$4) RETURNING *",
      [content, solution_date, id_problem, id_user]
    );

    res.json({
      data: newSolution,
      message: "Solution has been added successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};

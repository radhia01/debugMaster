const pool = require("../config/db");
// add new problem
exports.createProblem = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { problem_titre, problem_description, problem_date } = req.body;
    console.log(req.body)
    const newProblem = await pool.query(
      "INSERT INTO  problemstDBMASTER (problem_titre, problem_description, problem_date, id_user ) values ($1,$2,$3,$4)  RETURNING * ",
      [problem_titre, problem_description, problem_date, idUser]
    );

    return res.status(201).json({
      message: "Problem added successfully",
      data: newProblem.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// get problems
exports.getProblems = async (req, res) => {
  try {
    const problems = await pool.query("SELECT * FROM  problemstDBMASTER ");
    return res.status(200).json({ data: problems.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur de serveur", err: error.message });
  }
};
// delete problem
exports.deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    // delete all solutions related to problem
    await pool.query("DELETE FROM solutionDBMASTER WHERE id_problem=$1", [id]);
    // Retrieve tags associated with the problem
    const tagsQueryResult = await pool.query(
      "SELECT id_tag FROM  problemeTagsDBMASTER where id_problem=$1",
      [id]
    );

    console.log("tags" + tagsQueryResult.rows);
    // delete links between tags and problems
    await pool.query("DELETE FROM problemeTagsDBMASTER where id_problem=$1", [
      id,
    ]);

    // Extract tag IDs from the query result
    const tags = tagsQueryResult.rows.map((el) => el.id_tag); //
    // delete tags
    for (const tagId of tags) {
      await pool.query("DELETE FROM  tagDBMASTER where id=$1", [tagId]);
    }
    // delete the  problem
    const deletedProblem = await pool.query(
      "DELETE  FROM  problemstDBMASTER where id=$1 RETURNING * ",
      [id]
    );
    console.log(deletedProblem);
    return res.status(200).json({
      data: deletedProblem.rows[0],
      tags: tagsQueryResult.rows,
      message: "Problem has been deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", err: error.message });
  }
};
// update problem
exports.updateProblem = async (req, res) => {
  try {
    const { problem_titre, problem_description, content } = req.body;
    const { id } = req.params;

    const updatedProblem = await pool.query(
      "UPDATE  problemstDBMASTER SET  problem_titre =$1 ,  problem_description =$2 where id=$3 returning *",
      [problem_titre, problem_description, id]
    );
    await pool.query(
      "UPDATE  solutionDBMASTER set content=$1 where id_problem=$2",
      [content, id]
    );

    return res.status(200).json({
      message: "Problem has been updated successfully",
      data: updatedProblem.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// get problem tags
exports.getProblemTags = async (req, res) => {
  try {
    const { id_problem } = req.params;

    const tags = await pool.query(
      "SELECT  tag_name  FROM  tagDBMASTER inner join  problemeTagsDBMASTER on tagDBMASTER.id= problemeTagsDBMASTER.id_tag and problemeTagsDBMASTER.id_problem=$1 ",
      [id_problem]
    );

    return res.status(200).json({ data: tags.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", err: error.message });
  }
};
// get problem
exports.getProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await pool.query(
      "SELECT  * FROM  problemstDBMASTER where  id=$1 ",
      [id]
    );
    const tags = await pool.query(
      "SELECT  tag_name  FROM  tagDBMASTER inner join  problemeTagsDBMASTER on tagDBMASTER.id= problemeTagsDBMASTER.id_tag and problemeTagsDBMASTER.id_problem=$1 ",
      [id]
    );
    const user = await pool.query(
      "SELECT username from  userDBMASTER inner join problemstDBMASTER on  userDBMASTER.id=problemstDBMASTER.id_user and  problemstDBMASTER.id=$1",
      [id]
    );
    const solution = await pool.query(
      "SELECT * FROM  solutionDBMASTER where  id_problem=$1",
      [id]
    );
    console.log(problem, solution, tags);
    return res.status(200).json({
      data: {
        problem: problem.rows[0],
        user: user.rows[0],
        solution: solution.rows[0],
        tags: tags.rows,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// get  problems by tag
exports.getProblemsByTag = async (req, res) => {
  const { id } = req.params;

  try {
    const problems = await pool.query(
      "SELECT  * FROM problemstDBMASTER INNER JOIN problemeTagsDBMASTER on  problemstDBMASTER.id= problemeTagsDBMASTER.id_problem and problemeTagsDBMASTER .id_tag=$1",
      [id]
    );
    return res.status(200).json({ data: problems.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", msg: error.message });
  }
};

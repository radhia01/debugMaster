const pool = require("../config/db");
// add tag
exports.addTag = async (req, res) => {
  const { tags } = req.body;
  const { idprobleme } = req.params;
  try {
    for (const tag of tags) {
      // verify if tag already exist
      const existingTagResult = await pool.query(
        "SELECT id FROM tagDBMASTER WHERE tag_name= ($1)",
        [tag]
      );

      if (existingTagResult.rows.length > 0) {
        // if tag already exist get the id
        const tagId = existingTagResult.rows[0].id;

        await pool.query(
          "INSERT INTO problemeTagsDBMASTER(id_tag,id_problem) VALUES ($1, $2)",
          [tagId, idprobleme]
        );
      } else {
        // if tag does not exist add it
        const tagInsertResult = await pool.query(
          "INSERT INTO tagDBMASTER (tag_name) VALUES ($1) RETURNING id",
          [tag]
        );
        const tagId = tagInsertResult.rows[0].id;
        // associate tag to the problem
        await pool.query(
          "INSERT INTO problemeTagsDBMASTER(id_tag,id_problem) VALUES ($1, $2)",
          [tagId, idprobleme]
        );
      }
    }
    res.status(200).json({
      message: "Tags has been added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server Error ", err: error.message });
  }
};
// get tags
exports.getTags = async (req, res) => {
  try {
    const tags = await pool.query("SELECT * FROM  tagDBMASTER");
    return res.status(200).json({ data: tags.rows });
  } catch (error) {}
};

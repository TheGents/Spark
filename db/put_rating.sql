UPDATE matches SET rated = $1 WHERE id = $2
RETURNING*
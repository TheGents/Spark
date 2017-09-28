UPDATE matches SET rating = $3 WHERE (chick_id = $1 AND dude_id = $2)
RETURNING *
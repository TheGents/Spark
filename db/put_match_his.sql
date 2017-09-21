UPDATE matches SET dude_swipe = $3 WHERE (dude_id = $2 AND chick_id = $1)
RETURNING *
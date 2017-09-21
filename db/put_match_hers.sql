UPDATE matches SET chick_swipe = $3 WHERE (dude_id = $1 AND chick_id = $2)
RETURNING *
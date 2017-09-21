INSERT INTO matches(chick_id, dude_id, chick_swipe, dude_swipe) VALUES($2, $1, $3, null)
RETURNING *


DELETE from user_profile WHERE id = $1
RETURNING *;
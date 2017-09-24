UPDATE user_profile SET photo2 = $2 WHERE facebook_auth_id = $1
 RETURNING *;
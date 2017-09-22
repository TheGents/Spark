UPDATE user_profile SET general_bio = $2, occupation = $3 WHERE facebook_auth_id = $1
RETURNING *;
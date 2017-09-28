UPDATE user_profile SET photo2 = $3 WHERE facebook_auth_id = $1
RETURNING * 
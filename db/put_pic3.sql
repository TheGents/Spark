UPDATE user_profile SET photo3 = $4 WHERE facebook_auth_id = $1
RETURNING * 
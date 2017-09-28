UPDATE user_profile SET photo4 = $5 WHERE facebook_auth_id = $1
RETURNING * 
UPDATE user_profile SET photo1 = $2 WHERE facebook_auth_id = $1
RETURNING * 
UPDATE user_profile SET first_name = $2, school = $3, occupation = $4, location = $5, gender = $6, age = $7, facebok_pic = $8, general_bio = $9 WHERE facebook_auth_id = $1
RETURNING *;
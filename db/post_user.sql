INSERT INTO user_profile(first_name, school, occupation, location, gender, facebook_pic, facebook_auth_id, general_bio, age, rating) VALUES($2,null,$4, null, $5, $6, $1, null, $3, null)
RETURNING *


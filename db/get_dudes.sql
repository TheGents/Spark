SELECT user_profile.id, user_profile.first_name, user_profile.school, user_profile.occupation, 
user_profile.location, user_profile.facebook_pic, user_profile.facebook_auth_id, 
user_profile.general_bio, user_profile.age, user_profile.photo1, user_profile.photo2, 
user_profile.photo3, user_profile.photo4, (SELECT CAST(AVG (rating) AS DECIMAL(10,1)) 
from kk_rating WHERE dude_id = user_profile.facebook_auth_id) FROM user_profile WHERE gender = '1';

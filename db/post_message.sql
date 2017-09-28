INSERT INTO match_messages(room_id, user_id, created_at, message) VALUES($1,$2,$3,$4)
RETURNING*
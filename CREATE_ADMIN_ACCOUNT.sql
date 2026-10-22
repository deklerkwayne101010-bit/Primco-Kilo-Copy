-- Create admin account
-- Replace email and password with your own

-- To generate base64 password in SQL, you can use encode()
INSERT INTO admin_users (email, password_hash) 
VALUES ('youremail@example.com', encode('yourpassword'::bytea, 'base64'))
ON CONFLICT (email) DO UPDATE SET password_hash = encode('yourpassword'::bytea, 'base64');

-- Or manually with known base64
-- INSERT INTO admin_users (email, password_hash) 
-- VALUES ('youremail@example.com', 'cHJpbWVjbzIwMjQ=');

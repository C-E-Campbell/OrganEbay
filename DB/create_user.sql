INSERT INTO users1 (email, password, user_name)
VALUES ($1,
        $2,
        $3);


SELECT email,
       user_name
FROM users1
WHERE email = $1;


dROP TABLE IF EXISTS purchse_history;


dROP TABLE IF EXISTS users;


dROP TABLE IF EXISTS inventory;


CREATE TABLE users1(user_id SERIAL PRIMARY KEY,
                                           user_name TEXT UNIQUE NOT NULL,
                                                                 password TEXT NOT NULL,
                                                                               email TEXT UNIQUE NOT NULL);


INSERT INTO users1(user_name,
                   password,
                   email)
VALUES ('charlie',
        'charlie',
        'charlie@gmail.com')
CREATE TABLE inventory(organ_id SERIAL PRIMARY KEY,
                                               organ_name VARCHAR(64) NOT NULL,
                                                                      price INTEGER NOT NULL,
                                                                                    quality TEXT NOT NULL,
                                                                                                 image TEXT NOT NULL);


INSERT INTO inventory(organ_name,
                      price,
                      quality,
                      image)
VALUES ('heart',
        300,
        '3',
        'https://timedotcom.files.wordpress.com/2016/04/human-heart-health-illustration.jpg')
CREATE TABLE purchase_history(purchase_id SERIAL PRIMARY KEY,
                                                         purchase_date DATE DEFAULT NOW(),
                                                                                    user_id INTEGER REFERENCES users1(user_id),
                                                                                                               organ_id INTEGER REFERENCES inventory(organ_id))
INSERT INTO purchase_history(user_id,
                             organ_id)
VALUES (1,
        1)
SELECT users1.user_id,
       user_name,
       password,
       email,
       purchase_date,
       inventory.organ_id,
       organ_name,
       price,
       quality,
       image
FROM users1
JOIN purchase_history ON (users1.user_id = purchase_history.user_id)
JOIN inventory on(purchase_history.organ_id = inventory.organ_id)
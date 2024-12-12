CREATE DATABASE users_db;
USE users_db;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    second_last_name VARCHAR(50),
    birth_date DATE,
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROCEDIMIENTO PARA AÑADIR UN USUARIO A LA TABLA
DELIMITER $$
CREATE PROCEDURE insert_user(
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_second_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_phone_number VARCHAR(15)
)
BEGIN
    DECLARE hashed_password VARCHAR(255);
    
    -- Cifrar la contraseña usando SHA2 (256 bits)
    SET hashed_password = SHA2(p_password, 256);
    
    -- Insertar el usuario con la contraseña cifrada
    INSERT INTO users (email, password, first_name, last_name, second_last_name, birth_date, phone_number)
    VALUES (p_email, hashed_password, p_first_name, p_last_name, p_second_last_name, p_birth_date, p_phone_number);
END$$
DELIMITER ;

-- PROCEDIMIENTO PARA COMPARAR SI EL USUARIO Y CONTRASEÑA SON CORRECTOS
DELIMITER $$
CREATE PROCEDURE verify_user(
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    OUT p_is_valid BOOLEAN
)
BEGIN
    DECLARE stored_password VARCHAR(255);
    
    -- Obtener la contraseña cifrada almacenada en la base de datos
    SELECT password INTO stored_password
    FROM users
    WHERE email = p_email;
    
    -- Si no se encuentra el usuario, establecer p_is_valid como FALSE
    IF stored_password IS NULL THEN
        SET p_is_valid = FALSE;
    ELSE
        -- Comparar las contraseñas
        IF SHA2(p_password, 256) = stored_password THEN
            SET p_is_valid = TRUE;
        ELSE
            SET p_is_valid = FALSE;
        END IF;
    END IF;
END$$
DELIMITER ;

-- PROCEDIMIENTO PARA ELIMINAR UN USUARIO POR SU CORREO
DELIMITER $$
CREATE PROCEDURE delete_user_by_email(
    IN p_email VARCHAR(100),
    OUT p_is_deleted BOOLEAN
)
BEGIN
    -- Eliminar el usuario con el correo electrónico proporcionado
    DELETE FROM users
    WHERE email = p_email;
    
    -- Verificar si se eliminó alguna fila
    IF ROW_COUNT() > 0 THEN
        SET p_is_deleted = TRUE;
    ELSE
        SET p_is_deleted = FALSE;
    END IF;
END$$
DELIMITER ;

SELECT * FROM users;
CALL insert_user('sebas@gmail.com', 'Aguacate20', 'Sebastián', 'Morales', 'Palacios', '2002-04-25', '5583128222');

CALL verify_user('sebas@gmail.com', 'Aguacate20', @is_valid);
SELECT @is_valid AS Correcto;  -- Esta consulta te devolverá TRUE si las credenciales son correctas, o FALSE si no lo son.

CALL delete_user_by_email('sebas@gmail.com', @is_deleted);
SELECT @is_deleted AS Eliminado;

 -- DROP DATABASE users_db;

-- TRUNCATE TABLE users;





-- TRANSACTIONS TABLE

CREATE TABLE transactions(
    id INT NOT NULL AUTO_INCREMENT,
    concept VARCHAR(255) NOT NULL,
    type BOOLEAN NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    category VARCHAR(24) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- INSERTIONS

INSERT INTO transactions(concept, type, amount, category)
        VALUES ('Starbucks coffee', 0, 2.75, 'food');
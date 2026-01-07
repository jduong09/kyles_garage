ALTER TABLE inventory ADD COLUMN quantity NUMERIC NOT NULL DEFAULT 1;
UPDATE inventory SET quantity = 5;
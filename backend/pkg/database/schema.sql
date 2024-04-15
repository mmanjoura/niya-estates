CREATE TABLE Agents (
    id INTEGER PRIMARY KEY,
    name TEXT,
    designation TEXT,
    about TEXT,
    active_listings INTEGER,
    experience_since INTEGER,
    areas TEXT,
    languages TEXT
);

CREATE TABLE AgentCounters (
    id INTEGER PRIMARY KEY,
    agent_id INTEGER,
    for_rent INTEGER,
    for_sell INTEGER,
    commercial INTEGER,
    FOREIGN KEY (agent_id) REFERENCES Agents(id)
);

CREATE TABLE Properties (
    id INTEGER PRIMARY KEY,
    agent_id INTEGER,
    img TEXT,
    [status] TEXT,
    [name] TEXT,
    [location] TEXT,
    [description] TEXT,
    bedroom TEXT,
    bathroom TEXT,
    area TEXT,
    [money] TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES Agents(id)
);




CREATE TABLE PropertyFeatures (
    id INTEGER PRIMARY KEY,
    property_id INTEGER,
    feature TEXT,
    FOREIGN KEY (property_id) REFERENCES Properties(id)
);

CREATE TABLE images (
    ID         INTEGER  PRIMARY KEY,
    property_id INTEGER,
    page_name  TEXT,
    image_size TEXT,
    [image]      TEXT,
    Created_At DATETIME DEFAULT CURRENT_TIMESTAMP,
    Updated_At DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (property_id) REFERENCES Properties(id)
    
);

CREATE TABLE PropertyTags (
    id INTEGER PRIMARY KEY,
    property_id INTEGER,
    tag TEXT,
    FOREIGN KEY (property_id) REFERENCES Properties(id)
);

CREATE TABLE PropertyTypes (
    id INTEGER PRIMARY KEY,
    property_id INTEGER,
    property_type TEXT,
    FOREIGN KEY (property_id) REFERENCES Properties(id)
);
-- Dummy data for Agents table
INSERT INTO Agents (name, designation, about, active_listings, experience_since, areas, languages)
VALUES 
    ('Alexander Kaminski', 'Property Consultant', 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation', 7, 2019, 'Brazi', 'English, Brazil');



-- Dummy data for Properties table
INSERT INTO Properties (title, description, price, location, image_url, status)
VALUES 
    ('Beautiful Villa in the Hills', 'A stunning villa with panoramic views', 500000, 'Hillside Drive, Los Angeles', 'https://example.com/image1.jpg', 'For Sale'),
    ('Cozy Apartment in the City Center', 'Modern apartment with city views', 2000, 'Main Street, New York', 'https://example.com/image2.jpg', 'For Rent');

-- Dummy data for PropertyDetails table
INSERT INTO PropertyDetails (property_id, bedrooms, bathrooms, area_sqft)
VALUES
    (1, 4, 3, 3500),
    (2, 2, 1, 1000);

-- Dummy data for PropertyFeatures table
INSERT INTO PropertyFeatures (property_id, feature)
VALUES
    (1, 'Swimming Pool'),
    (1, 'Garden'),
    (2, 'Gym'),
    (2, 'Parking');

-- Dummy data for PropertyImages table
INSERT INTO PropertyImages (property_id, image_url)
VALUES
    (1, 'https://example.com/image1.jpg'),
    (1, 'https://example.com/image2.jpg'),
    (2, 'https://example.com/image3.jpg');

-- Dummy data for PropertyTags table
INSERT INTO PropertyTags (property_id, tag)
VALUES
    (1, 'For Sale'),
    (1, 'Featured'),
    (2, 'For Rent');

    INSERT INTO PropertyTypes (property_id, property_type)
VALUES
    ('New'),
    ('Commercial'),
    ('Rent'),
    ('Buy');

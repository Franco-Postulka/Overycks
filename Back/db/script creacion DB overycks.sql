CREATE DATABASE overycks;
USE overycks;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(40) NOT NULL,
email VARCHAR(50) NOT NULL,
contrasenia VARCHAR(250) NOT NULL
);

CREATE TABLE producto(
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(120) NOT NULL,
descripcion VARCHAR(500) NOT NULL,
precio FLOAT NOT NULL
);

CREATE TABLE carrito (
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    unidades INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id)  ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)  ON DELETE CASCADE,
    UNIQUE (id_producto, id_usuario)
);

CREATE TABLE favoritos(
id_producto INT NOT NULL,
id_usuario INT NOT NULL,
foreign key (id_producto) references producto(id)  ON DELETE CASCADE,
foreign key (id_usuario) references usuario(id)  ON DELETE CASCADE
);

CREATE TABLE stock(
id_producto INT NOT NULL,
small INT NOT NULL,
medium INT NOT NULL,
large INT NOT NULL,
foreign key (id_producto) references producto(id)  ON DELETE CASCADE
);

CREATE TABLE imagenes(
id INT PRIMARY KEY AUTO_INCREMENT,
url VARCHAR(400) NOT NULL 
);

CREATE TABLE imagenes_productos(
id_producto INT NOT NULL,
id_imagenes INT NOT NULL,
foreign key (id_producto) references producto(id) ON DELETE CASCADE,
foreign key(id_imagenes) references imagenes(id) ON DELETE CASCADE
);

INSERT INTO producto (titulo, descripcion, precio) VALUES
("Blue & Black Check Shirt", "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions." ,29.99),
("Gigabyte Aorus Men Tshirt", "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style." ,24.99),
("Man Plaid Shirt", "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions." ,34.99),
("Man Short Sleeve Shirt", "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look." ,19.99),
("Men Check Shirt", "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe." ,27.99),
("Nike Air Jordan 1 Red And Black", "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes." ,149.99),
("Nike Baseball Cleats", "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices." ,79.99),
("Puma Future Rider Trainers", "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use." ,89.99),
("Sports Sneakers Off White & Red", "The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch." ,119.99),
("Sports Sneakers Off White Red", "Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions." ,109.99),
("Black Women's Gown", "The Black Women's Gown is an elegant and timeless evening gown. With a sleek black design, it's perfect for formal events and special occasions, exuding sophistication and style." ,129.99),
("Corset Leather With Skirt", "The Corset Leather With Skirt is a bold and edgy ensemble that combines a stylish corset with a matching skirt. Ideal for fashion-forward individuals, it makes a statement at any event." ,89.99),
("Corset With Black Skirt", "The Corset With Black Skirt is a chic and versatile outfit that pairs a fashionable corset with a classic black skirt. It offers a trendy and coordinated look for various occasions." ,79.99),
("Dress Pea", "The Dress Pea is a stylish and comfortable dress with a pea pattern. Perfect for casual outings, it adds a playful and fun element to your wardrobe, making it a great choice for day-to-day wear." ,49.99),
("Marni Red & Black Suit", "The Marni Red & Black Suit is a sophisticated and fashion-forward suit ensemble. With a combination of red and black tones, it showcases a modern design for a bold and confident look." ,179.99),
("Black & Brown Slipper", "The Black & Brown Slipper is a comfortable and stylish choice for casual wear. Featuring a blend of black and brown colors, it adds a touch of sophistication to your relaxation." ,19.99),
("Calvin Klein Heel Shoes", "Calvin Klein Heel Shoes are elegant and sophisticated, designed for formal occasions. With a classic design and high-quality materials, they complement your stylish ensemble." ,79.99),
("Golden Shoes Woman", "The Golden Shoes for Women are a glamorous choice for special occasions. Featuring a golden hue and stylish design, they add a touch of luxury to your outfit." ,49.99),
("Pampi Shoes", "Pampi Shoes offer a blend of comfort and style for everyday use. With a versatile design, they are suitable for various casual occasions, providing a trendy and relaxed look." ,29.99),
("Red Shoes", "The Red Shoes make a bold statement with their vibrant red color. Whether for a party or a casual outing, these shoes add a pop of color and style to your wardrobe." ,34.99)
;

INSERT INTO imagenes (url) VALUES
("https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/4.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/1.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/2.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/3.png"),
("https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/4.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/1.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/2.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/3.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/4.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20Leather%20With%20Skirt/1.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20Leather%20With%20Skirt/2.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20Leather%20With%20Skirt/3.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20Leather%20With%20Skirt/4.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20With%20Black%20Skirt/1.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20With%20Black%20Skirt/2.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20With%20Black%20Skirt/3.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20With%20Black%20Skirt/4.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Dress%20Pea/1.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Dress%20Pea/2.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Dress%20Pea/3.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Dress%20Pea/4.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Marni%20Red%20&%20Black%20Suit/1.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Marni%20Red%20&%20Black%20Suit/2.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Marni%20Red%20&%20Black%20Suit/3.png"),
("https://cdn.dummyjson.com/products/images/womens-dresses/Marni%20Red%20&%20Black%20Suit/4.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Black%20&%20Brown%20Slipper/1.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Black%20&%20Brown%20Slipper/2.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Black%20&%20Brown%20Slipper/3.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Black%20&%20Brown%20Slipper/4.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Calvin%20Klein%20Heel%20Shoes/1.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Calvin%20Klein%20Heel%20Shoes/2.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Calvin%20Klein%20Heel%20Shoes/3.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Calvin%20Klein%20Heel%20Shoes/4.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Golden%20Shoes%20Woman/1.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Golden%20Shoes%20Woman/2.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Golden%20Shoes%20Woman/3.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Golden%20Shoes%20Woman/4.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Pampi%20Shoes/1.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Pampi%20Shoes/2.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Pampi%20Shoes/3.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Pampi%20Shoes/4.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Red%20Shoes/1.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Red%20Shoes/2.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Red%20Shoes/3.png"),
("https://cdn.dummyjson.com/products/images/womens-shoes/Red%20Shoes/4.png")
;

INSERT INTO imagenes_productos (id_producto, id_imagenes) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,5),
(2,6),
(2,7),
(2,8),
(3,9),
(3,10),
(3,11),
(3,12),
(4,13),
(4,14),
(4,15),
(4,16),
(5,17),
(5,18),
(5,19),
(5,20),
(6,21),
(6,22),
(6,23),
(6,24),
(7,25),
(7,26),
(7,27),
(7,28),
(8,29),
(8,30),
(8,31),
(8,32),
(9,33),
(9,34),
(9,35),
(9,36),
(10,37),
(10,38),
(10,39),
(10,40),
(11,41),
(11,42),
(11,43),
(11,44),
(12,45),
(12,46),
(12,47),
(12,48),
(13,49),
(13,50),
(13,51),
(13,52),
(14,53),
(14,54),
(14,55),
(14,56),
(15,57),
(15,58),
(15,59),
(15,60),
(16,61),
(16,62),
(16,63),
(16,64),
(17,65),
(17,66),
(17,67),
(17,68),
(18,69),
(18,70),
(18,71),
(18,72),
(19,73),
(19,74),
(19,75),
(19,76),
(20,77),
(20,78),
(20,79),
(20,80)
;

use overycks;
SELECT * FROM producto;
SELECT * FROM imagenes;
SELECT * FROM imagenes_productos;
SELECT * FROM usuario;
SELECT * FROM carrito;
SELECT * FROM favoritos;
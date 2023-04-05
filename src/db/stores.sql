create table if not exists detailStore(
	id int primary key auto_increment,
	img varchar(60),
	descriptionPizza varchar(30),
    idStore int,
    foreign key (idStore) REFERENCES stores(id)
);

insert into detailStore (img, descriptionPizza, idStore) values
    ("pollo.png", "Pizza de Pollo", 1),
    ("pollo&champiñones.png", "Pizza de Pollo y Champiñones", 1),
    ("vegetales.png", "Pizza de Vegetales", 1),
    ("vegetales&atun.png", "Pizza de Vegetales y Atun", 1),
    ("queso&champiñones.png", "Pizza 3 Quesos con Champiñones", 1),
    ("queso&jamon.png", "Pizza de Jamon y Queso", 1);

create table if not exists stores(
    logo varchar(20),
    title varchar(20) not null,
    descriptionStores varchar(60) not null,
    direction varchar(20) not null,
    id int primary key auto_increment
);

insert into stores (logo, title, descriptionStores, direction) values
    ("Panos_pizza.png", "Pano's Pizza", 'Esta pizzeria se especializa en ingredientes salados', "Calle 1 #2-3"),
    ("Sbarro.png", "SBarro", 'Esta pizzeria se especializa en ingredientes picantes', "Calle 2 #3-4"),
    ("pizzeria_camion.png", "Pizzeria Camión", 'Esta pizzeria se especializa en ingredientes vegetales', "Calle 3 #4-5"),
    ("voglia_di_pizza.png", "Voglia Di Pizza", 'Esta pizzeria se especializa en ingredientes maarinos', "Calle 4 #5-6"),
    ("stroller_pizza.png", "Stroller Pizza", 'Esta pizzeria se especializa en ingredientes tropicales', "Calle 5 #6-7"),
    ("trulli.png", "Trulli", 'Esta pizzeria se especializa en ingredientes mediterraneos', "Calle 9 #10-11");
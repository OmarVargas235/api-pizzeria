create table if not exists users(
	name varchar(50) not null,
    lastName varchar(50) not null,
    email varchar(50) primary key not null,
    password varchar(70) not null,
    token varchar(256) DEFAULT "",
    tokenURL varchar(256) DEFAULT "",
    img varchar(200) DEFAULT null,
    idImage varchar(30) DEFAULT null
);

select * from users where email = '${body.email}';

insert into users (name, lastName, email, password) values ("${body.name}", "${body.lastName}", "${body.email}", "${body.password}");
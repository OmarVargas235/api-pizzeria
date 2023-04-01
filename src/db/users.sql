create table if not exists users(
	name varchar(50) not null,
    lastName varchar(50) not null,
    email varchar(50) primary key not null,
    password varchar(70) not null
);

select * from users where email = '${body.email}';

insert into users values ("${body.name}", "${body.lastName}", "${body.email}", "${body.password}");
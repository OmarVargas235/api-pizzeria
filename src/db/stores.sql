create table detailStore(
	img varchar(60),
    description varchar(16),
    id int primary key auto_increment
);

create table stores(
	logo varchar(60),
    description varchar(60) not null,
    direction varchar(20) not null,
    idDetail int unique not null,
    id int primary key auto_increment,
    foreign key (idDetail) references detailStore(id)
);
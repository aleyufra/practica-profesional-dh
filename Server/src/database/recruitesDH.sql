create schema recruitingRH;
use recruitingRH;

create table candidates(
	id bigint auto_increment,
    dni varchar(8) unique not null,
    name varchar(50) not null,
    surname varchar(50) not null,
    email varchar(50) unique not null,
    phone varchar(30) null,
    birthday date not null,
    gender varchar(20) not null,
    image varchar(500) not null,
    primary key(id)
);

create table professions(
	id bigint auto_increment,
	profession varchar(100) not null,
    candidate_id bigint not null,
    primary key(id),
    foreign key(candidate_id) references candidates(id)
);

create table social_networks(
	id bigint auto_increment,
    linkedin varchar(100) unique null,
    candidate_id bigint not null,
    primary key(id),
    foreign key(candidate_id) references candidates(id)
);
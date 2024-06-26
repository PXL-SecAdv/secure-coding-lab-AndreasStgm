create user secadv with password 'ilovesecurity';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

create extension pgcrypto;


insert into users (user_name, password) values ('pxl-admin', 'insecureandlovinit') ;
insert into users (user_name, password) values ('george', 'iwishihadbetteradmins') ;
-- insert into users (user_name, password) values ('pxl-admin', crypt('insecureandlovinit', gen_salt('bf'))) ;
-- insert into users (user_name, password) values ('george', crypt('iwishihadbetteradmins', gen_salt('bf'))) ;

COMMIT;
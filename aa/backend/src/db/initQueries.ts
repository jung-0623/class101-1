const initQueries = `
create table if not exists "users" (
  "id" int primary key auto_increment,
  "name" varchar(20)
);

create table if not exists "posts" (
  "id" int primary key auto_increment,
  "authorId" int,
  "body" varchar(255),
  "timestamp" bigint
);

create table if not exists "comments" (
  "id" int primary key auto_increment,
  "postId" int,
  "authorId" int,
  "body" varchar(255),
  "timestamp" bigint
)
`.replace(/"/g, "`")

export default initQueries

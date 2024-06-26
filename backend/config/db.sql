create table userDBMASTER (id serial primary key ,username varchar(30) ,user_email varchar(50), user_password varchar(100))
create table problemstDBMASTER (id serial primary key ,problem_titre varchar(30), problem_description varchar(50), 
problem_date date ,id_user int  , foreign key (id_user) references userDBMASTER(id)  )


create table solutionDBMASTER( id serial primary key,content varchar(200), solution_date date,id_problem int ,id_user int , foreign key (id_problem) references problemstDBMASTER (id),
foreign key (id_user) references userDBMASTER (id) 
)
create table tagDBMASTER(id serial primary key ,tag_name varchar(40))
create table problemeTagsDBMASTER(id_tag int  ,id_problem int ,primary key(id_tag,id_problem), foreign key (id_tag) references tagDBMASTER(id), foreign key (id_problem) references problemstDBMASTER(id))
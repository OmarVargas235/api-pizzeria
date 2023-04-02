select * from users where email = '${body.email}';
update users set tokenURL="${token}" where email='${userBD.email}';
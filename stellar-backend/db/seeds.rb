User.destroy_all
Project.destroy_all
p = Project.create(title:'title',description:'asdf')
User.create(username:'ben',password:'1234',project:p)
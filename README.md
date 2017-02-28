### THIS IS A README FILE!

- A great site to learn some hacking is [overthewire](https://overthewire.org)!

- [Escaping query values](https://github.com/mysqljs/mysql#escaping-query-values)

- [hackthissite](https://www.hackthissite.org/)

- ![](http://i.imgur.com/mdHqY9n.png)

### What are SQL Injections?

- Most simply, a SQL Injection is when a hacker, nefarious or otherwise, adds a SQL query into what should otherwise contain user information. In this example, we are putting injections into a user login system.

### Why are they bad?

- If any person can run any query on your system from the browser, they can do all kinds of fun (terrible) things:
  * SELECT * FROM table; - to get all of your row data. If this contains credit card information or passwords someone can scam your users and it will be your fault.
  * DROP DATABASE; - I can access the data that you've spent years collecting, organizing, and storing? Why not just delete it all in one go!
  * UPDATE <table> SET password=12345 WHERE 1=1; Ever wanted to log in as just anyone? Now you can set _everyone's_ password to 12345 and be whoever you want! I _AM_ the Batman!

### This is awful! What can I do to protect my code!?
* Read the comments in this code and listen to my lecture!
* Both the mysql and sequelize modules have you covered. They do a lot to protect you from injections by default.
* In other languages, make ABSOLUTELY CERTAIN that you escape characters in user input. You don't want you query to read semicolons, OR, or WHERE statements.

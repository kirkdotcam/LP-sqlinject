### THIS IS A README FILE!

- A great site to learn some hacking is [overthewire](https://overthewire.org)!

- [Escaping query values](https://github.com/mysqljs/mysql#escaping-query-values) in the NPM mysql package.

- [Preapred statments in the mysql2 package](https://www.npmjs.com/package/mysql2#using-prepared-statements)

- [hackthissite](https://www.hackthissite.org/)

- There are plenty of penetration testing tools out there for SQL injections. A great one is known as [sqlmap](https://github.com/sqlmapproject/sqlmap), a python library that quickly scans and tests a lot of common injection vulnerabilities

- ![](http://i.imgur.com/mdHqY9n.png)


### What are SQL Injections?

 Most simply, a SQL Injection is when a hacker, nefarious or otherwise, adds a SQL query into what should otherwise contain user information. In this example, we are putting injections into a user login system.

### Why are they bad?

If any person can run any query on your system from the browser, they can do all kinds of fun (terrible) things.

### Common Injections

As a user in this application, I could simply login as "Cam". However, an astute observer looking in the console will see that there is more data being sent back to the client than necessary. As a hacker I would immediately assume that the person building this page may have left security holes, and I would begin trying to test statements in the user login. Let's try a simple `SELECT * FROM` statment and see where that takes us.

```sql 
Cam' OR 1=1; SELECT * FROM accounts WHERE fname='Cam

-- example of a simple injection. By adding the OR statement, I can grab every row where 1=1 (always true). Note the double statement in this example is due to the particular way I have written the query in app.js

```
A simple `SELECT` statment can open the door to all kinds of havoc when formatted in just the right way. When we fail to properly escape characters in our SQL statements, we can end up exposing more than we'd like to our end user. We should also take care - when working with user data - to never return _more_ data than is necessary to the client. Finally, if we are storing user passwords in a database, they should _never_, under _any_ circumstances, be stored as plain text. 

Say a hacker has access to SQL injections on your table; they'll wan't to get an idea of what information they can retreive from that table with the following query.

```sql
Cam'; SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='accounts


-- See table schema. This can let a potential hacker see the entire layout of your table so that they may pick and choose columns relevant to what they want to grab.

```
This can, very obviously, be all kinds of dangerous if run. Even if you pared down what kind of data was returned to the user in the original `SELECT` statement, this may allow a user to see the full extent of what columns exist on your table, opening the door to a wider variety of issues (known in security circles as "increasing the attack surface")

Knowing the name of the password column means that I can now  access it, and if you haven't set permissions correctly, I can even go so far as to _change_ password data, as in the sequel statement below. Again, one should never store password data in plain text **anywhere**. 

```sql
Cam'; UPDATE accounts SET password='12345' WHERE 1=1; SELECT * FROM accounts WHERE fname='Cam

-- UPDATE <table> SET password=12345 WHERE 1=1; Ever wanted to log in as just anyone? Now you can set every password to 12345 and be whoever you want! I _AM_ the Batman!

```

Lastly, and one of my favorites, is being able to `DROP` tables or even entire databases. Although deleting a record after changing it could be fun, there's nothing that says "you just got hacked" like opening your database and finding absolutely nothing. 

```sql
Cam'; DROP TABLE accounts; SELECT * FROM accounts WHERE fname='Cam

-- DROP TABLE; - I can access the data that you have spent years collecting, organizing, and storing? Why not just delete it all in one go!

```

Although these are relatively small hacks by comparison, you all can use your imagination to think of the scale at which attacks can be utilized to affect or retreive user data.

### This is awful! What can I do to protect my code!?
* Read the comments in this code and listen to my lecture!
* Both the mysql and sequelize modules have you covered. They do a lot to protect you from injections by default.
* In other languages, make ABSOLUTELY CERTAIN that you escape characters in user input. You don't want you query to read semicolons, OR, or WHERE statements.
* The technical term to protect against most injections is a [prepared statement](https://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks)

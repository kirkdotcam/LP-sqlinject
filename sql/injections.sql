--example of a simple injection. By adding the OR statement, I can grab every row where 1=1 (always true). In a following SQL statment, I perform the equivalent query using SELECT * FROM method.
2 or 1=1; SELECT * FROM main_table;


-- See table schema. This can let a potential hacker see the entire layout of your table so that they may pick and choose columns relevant to what they want to grab.
SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='main_table'

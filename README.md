## database assignment 2
# This assumes that you have a mongo database with the twitter data.

This repository has just 2 files the package.json and the main.js
The dependensies are "mongodb"
The file main.js has 5 functions.
1. A function that uses the distinct method to see how many "distinct" users there are.
2. A function that uses aggregate to get how many @ are being used (it could be for mails but in general most are for the reply halløj on twitter)
it then return who uses it the most.
3. A function that uses aggregate to get who has tweeted most tweets.
4. A function that takes a list of words  along with a label either good or bad, it then uses aggregate to run them through the database to see who types good words and who types bad words.
5. A function that uses aggregate to check if someone is using the @ sign and if it is used is then grouped together with all the other times the same person has been mentioned returning a list of the most mentioned.


# How to run?
1. open cmd (or something equivalent) and go to the code location
2. run node main.js <db_name> <col_name> 

ex. node main.js db_ass_2 things

3. replace <db_name> with the name of the database from your mongodb where the twitter halløj is.
4. replace <col_name> with the name of the collection from your mongodb where the twitter halløj is.    
5. wait with a coffee in hand (should take about a min)



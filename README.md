## database assignment 2
# This assumes that you have a mongo database running with the twitter data.

This repository has just 2 files the package.json, main.js and the index.html
The dependensies are "mongodb" and "express"
The file main.js has 5 functions.
1. A function that uses the distinct method to see how many "distinct" users there are.
2. A function that uses aggregate to get how many @ are being used (it could be for mails but in general most are for the reply halløj on twitter)
it then return who uses it the most.
3. A function that uses aggregate to get who has tweeted most tweets.
4. A function that takes a list of words  along with a label either good or bad, it then uses aggregate to run them through the database to see who types good words and who types bad words.
5. A function that uses aggregate to check if someone is using the @ sign and if it is used is then grouped together with all the other times the same person has been mentioned returning a list of the most mentioned.
6. Lastly the file also has a REST api to get all of it from the frontend (very basic REST and frontend though)

# How to run?
1. Open cmd (or something equivalent) and go to the code location
2. Run npm install
3. Run node main.js <db_name> <col_name> 

ex. node main.js db_ass_2 things

4. Replace <db_name> with the name of the database from your mongodb where the twitter halløj is.
5. Replace <col_name> with the name of the collection from your mongodb where the twitter halløj is.    
6. Now go to localhost:3333 and do what feels right.
<br><br><br><br><br><br>


7. And what feels right is to click the buttons and wait a bit  (they are somewhat explained)

## Expected Output
number of users
```json
659774
   ```
   users with most posts
   ```json
[{"_id":"lost_dog","total":549},
{"_id":"webwoke","total":345},
{"_id":"tweetpet","total":310},
{"_id":"SallytheShizzle","total":281},
{"_id":"VioletsCRUK","total":279},
{"_id":"mcraddictal","total":276},
{"_id":"tsarnick","total":248},
{"_id":"what_bugs_u","total":246},
{"_id":"Karen230683","total":238},
{"_id":"DarkPiano","total":236}]
   ```
   The users with the most links to other twitters
   ```json
[{"_id":"lost_dog","total":549},
{"_id":"dogzero","total":334},
{"_id":"tweetpet","total":310},
{"_id":"VioletsCRUK","total":296},
{"_id":"tsarnick","total":258},
{"_id":"SongoftheOss","total":257},
{"_id":"what_bugs_u","total":246},
{"_id":"Karen230683","total":244},
{"_id":"keza34","total":239},
{"_id":"SallytheShizzle","total":234}]
   ```
   The users who are @ mentioned the most
   ```json
[{"_id":"@mileycyrus","total":4310},
{"_id":"@tommcfly","total":3837},
{"_id":"@ddlovato","total":3349},
{"_id":"@Jonasbrothers","total":1263},
{"_id":"@DavidArchie","total":1222},
{"_id":"@jordanknight","total":1105},
{"_id":"@DonnieWahlberg","total":1085},
{"_id":"@JonathanRKnight","total":1053},
{"_id":"@mitchelmusso","total":1038},
{"_id":"@taylorswift13","total":973}]
   ```
   The users who use these bad words the most: ["shit","fuck","kill","bieber"]
   ```json
[{"_id":"mcraddictal","total":24},
{"_id":"MCRmuffin","total":21},
{"_id":"x33ieroNINJA","total":17},
{"_id":"She_shines92","total":16},
{"_id":"CC_Cassin","total":15},
{"_id":"tsarnick","total":15},
{"_id":"risha_","total":14},
{"_id":"misskatiemarie","total":12},
{"_id":"Spidersamm","total":12},
{"_id":"SallytheShizzle","total":11}]
   ```
   The users who use these good words the most: ["love","sweet","flower","tits"]
   ```json
[{"_id":"thalovebug","total":48},
{"_id":"StDAY","total":46},
{"_id":"TaqiyyaLuvLa","total":24},
{"_id":"_shannon1234","total":22},
{"_id":"ShesElectric_","total":22},
{"_id":"JasmineBarton","total":20},
{"_id":"stuckinlalaland","total":20},
{"_id":"VioletsCRUK","total":19},
{"_id":"jonas_twilight3","total":19},
{"_id":"GodFirst08","total":17}]
   ```
The users with the highest average polarity while having more than 150 posts
```json
[{"_id":"KevinEdwardsJr","avg":4,"total":171},
{"_id":"what_bugs_u","avg":4,"total":246},
{"_id":"DarkPiano","avg":3.9152542372881354,"total":236},
{"_id":"Scyranth","avg":3.9036144578313254,"total":166},
{"_id":"keza34","avg":3.853881278538813,"total":219},
{"_id":"shanajaca","avg":3.8309859154929575,"total":213},
{"_id":"cookiemonster82","avg":3.7,"total":160},
{"_id":"shellrawlins","avg":3.6729559748427674,"total":159},
{"_id":"maynaseric","avg":3.6729559748427674,"total":159},
{"_id":"TraceyHewins","avg":3.6587677725118484,"total":211}]
   ```
   The users with the lowest average polarity while having more than 150 posts
   ```json
[{"_id":"tweetpet","avg":0,"total":310},
{"_id":"lost_dog","avg":0,"total":549},
{"_id":"wowlew","avg":0.03773584905660377,"total":212},
{"_id":"mrs_mcsupergirl","avg":0.8860759493670886,"total":158},
{"_id":"webwoke","avg":0.9391304347826087,"total":345},
{"_id":"mcraddictal","avg":0.9565217391304348,"total":276},
{"_id":"_magic8ball","avg":1.1216931216931216,"total":189},
{"_id":"Dogbook","avg":1.2291666666666667,"total":192},
{"_id":"JBnVFCLover786","avg":1.3006134969325154,"total":163},
{"_id":"MiDesfileNegro","avg":1.310734463276836,"total":177}]
   ```
   
   

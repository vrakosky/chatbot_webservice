# chatbot_webservice
Intelligent and interactive resume website (responsive) with a chatbot communication using Gradle webservice. The chatbot have the capacity to interact with the résumé information with a personalized style of talk. 

2 in 1 catboat application can both play the role as a Robot and as a Web-service Chat. Everybody all around the world can contribute into the chatbot application, every message will be located with the name of the users and the corresponding flag. Here a demo between the chatbot and two humans from France :

![alt text](https://raw.githubusercontent.com/vrakosky/chatbot_webservice/master/doc/demo.png)

## Requirements

### Web Framework: 
- Spring boot

### Languages: 
- Java,  
- HTML5,
- CSS3,
- Javascript,
- Groovy, 
- Sqlite
- XML
- JSON

### Build system: 
- gradle 
- maven (to compile Java code)

### Package: 
- NLP (Natural Language Processing) with Compromise : https://github.com/spencermountain/compromise

# Run server
- cd server
- ./gradlew bootRun

## Server
- ChatController.java
- Message --> User, Date, Message

# Web client to open in web browser
- firefox client/index.html

## Client
- index.html : Display the page with the correspondant updated div.
- style.css : Give an intuitive look to the page.
- main.js : Every control is done in this area.
- detect_location.js : Information from users IP.
- Compromise package for NLP.

# Integration tests
## To run Curl-style integration tests --> you need to install curl, jq then run
-  cd test
### send a message with the terminal :
-  curl -X POST -H "Content-Type: text/plain"  http://localhost:8080/api/new-message -d 'Hello there'
- ./new-message "Your message"

### Ask server to display ALL messages : 
- curl http://localhost:8080/api/messages | jq . 
- ./read-messages

### You can also run java tests from directory 'server/src/tests/java' by :
- ./gradlew test


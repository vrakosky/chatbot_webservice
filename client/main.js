    function readMessages() {
        // Run the async request and chain promises
        // see https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
        // TODO: The following code is a bit ugly, rewrite it using async/await if you wish so
        fetch('http://localhost:8080/api/messages')
            .then(
                // Js will call the following  function when response arrives.
                function(response) {
                    // returns a Promise
                    return response.json();
                }
            )
            .then(
                // Js will call this function when json parsing is finished
                function(messages) {
                    return renderMessages(messages);
                }
            )
            .catch(
                function(error) {
                    console.log('Error ' + error);
                }
            );
    }

    // run readMessages every second 
    setInterval(readMessages, 1000);

    // loop over messages and update the corresponding div
    function renderMessages(messages) {
        let div = document.getElementById("div-with-messages");
        let messagesHtml = "";
        for (var i = 0; i < messages.length; i++) {
            let m = messages[i];
            // JSON cannot have a date object inside, so we should
            // reconstruct a new Date from string stored inside JSON
            let date = new Date(m.date);
            let dateForHuman = date.toLocaleString();
            messagesHtml = messagesHtml + '<i><small>' + dateForHuman + '</small></i> ' +
                m.text + '<br>';
        }
        let lastMessage = messages[messages.length - 1];
        chatBotReponse(lastMessage.text);
        div.innerHTML = messagesHtml;
    }

    //SIMPLE CHATBOT CLIENT
    function chatBotReponse(text) {
      if (text == "meteo") {
          let reponse = "Il pleut : " + text;
          sendMessageBot(reponse);
      } else if (text == "hello") {
          let reponse = "Hello You ";
          sendMessageBot(reponse);
      } 
      else {
          sendMessageBot(text);
      }

    function clickPress(event) {
        // if user pressed [Enter]
        if (event.keyCode == 13) {
            sendMessage();
        }
    }

    // use async/await to produce a good, readable code
    // https://medium.com/@ThatGuyTinus/callbacks-vs-promises-vs-async-await-f65ed7c2b9b4
    async function sendMessage() {
        let input = document.getElementById("new-message");
        let text = input.value;

        try {
            // send the message and wait for the response
            await fetch("http://localhost:8080/api/new-message", {
                method: "POST",
                body: text
            });

            // clear input
            input.value = "";

        } catch (error) {

            // in case of error, we alert user
            alert(error.message);
        }
    }

    //TRACKING IP
function ipLookUp () {
  let countryCode = null;
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          countryCode = response.countryCode.toString();
          localStorage.setItem('countryCode', countryCode);
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}
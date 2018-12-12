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


//CHATBOT CLIENT
function chatBotReponse(message) {
    if (/hello|hi|hey|bonjour|salut|welcome/.test(message)) {
        let reponse = "Welcome, I'm Vincedroid, the chatbot of Vincent. Ask me any question about professional stuff and more. If your question isn't recognized, try a keyword.";
        sendMessageBot(reponse);
    } else if (/job|plan/.test(message)){
        let reponse = "He participated to a Medical project for one year in Malaysia as an Engineer developer for the purpose of developing a neurofeedback to develop attention (ADHD). In France, he was affiliated with \"Ewill\" company as a Web developer. He is currently looking for a six-month engineering exchange for April 2019 in France or abroad. For any suggestion, you can leave a message to : vince.candappane@gmail.com";
        sendMessageBot(reponse);
    }else if (/career|school|education/.test(message)){
        let reponse = "Vincent finished a Technical Degree in Applied Engineering Computer Science in 2014. Today, Vincent is a student in the 5th year of the School of Computer and Electronics Engineering (ESIREM) and had recently participated in the creation of computer projects as well in France and in Malaysia. Also, he is preparing a big changes coming from investments and creating an innovative project based on Artificial Intelligence.";
        sendMessageBot(reponse);
    } else if (/manager|freelancer/.test(message)){
        let reponse = "Vincent has experience in leading project teams. He would like to advise and support organizations in accomplish the full benefits of the new technology through change management. He would like to lead a team working on the different components of change activities: an innovative campaign, a development program, etc. He hasn't been in a people lead role yet, and is looking for directing a small project team.";
        sendMessageBot(reponse);
    } else if (/talent|interaction/.test(message)){
        let reponse = "Vincent strengths are starting up (change) initiatives, creative and innovative communication, entreprener, public speaking, visualization enthusiasm.";
        sendMessageBot(reponse);
    } else if (/skills/.test(message)){
        let reponse = "Change management, facilitation knowledge, project management, team coordination, Lean and communication.";
        sendMessageBot(reponse);
    } else if (/travel|far|culture/.test(message)){
        let reponse = "Vincent has experience with change projects and innovation campaigns abroad. For the next missions, opportunity for short assignments abroad is appreciated.";
        sendMessageBot(reponse);
    } else if (/live|where/.test(message)){
        let reponse = "Vincent is situated in Paris, France. He can commute to any location when it is needed.";
        sendMessageBot(reponse);
    } else if (/style|method/.test(message)){
        let reponse = "Vincent likes making the digital transformation tangible for the employees in a Agile environment. So tasks automation and training programs is in the core of success. Coming into contact with many different people. He likes the international character of the work.";
        sendMessageBot(reponse);
    } else if (/hobbies|passion/.test(message)){
        let reponse = "In the spare time of Vincent, he loves to listen to music, watch movies, read books and hang out with friends. He also likes to go out on adventures with friends and family. Vincent love to be up-to-date with digital and future technology. He loves innovation and is ready for the excited times coming when virtual assistants, AI and IoT become bigger !";
        sendMessageBot(reponse);
    } else if (/I LOVE YOU|i love you|love you|love you/.test(message)){
        let reponse = "You are the wind beneath my wings";
        sendMessageBot(reponse);
    } else if (/fuck|shit|suck/.test(message)){
        let reponse = "Hmm, you're using some expressions I don't like. I'll gently ignore that one.";
        sendMessageBot(reponse);
    } else if (/help/.test(message)){
        let reponse = "Need some help ? Try asking questions like a recruiter: ask me about, career, talents, current job, previous job, hobbies, commute, travel, etc (Here an exemple if you tape a sentence with the keyword \"job\")";
        sendMessageBot("My pleasure to tell you more.");
        sendMessageBot(reponse);
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

function selectFlag(flag){
  switch (flag) {
    case 'AF':
      //Afghanistan
      return String.fromCodePoint(0x1F1E6, 0x1F1EB);
      break;
    case 'AX':
      //Åland Islands
      return String.fromCodePoint(0x1F1E6, 0x1F1FD);
      break;
    case 'AL':
      //Albania
      return String.fromCodePoint(0x1F1E6, 0x1F1F1);
      break;
    case 'DZ':
      //Algeria
      return String.fromCodePoint(0x1F1E9, 0x1F1FF);
      break;
    case 'AS':
      //American Samoa
      return String.fromCodePoint(0x1F1E6, 0x1F1F8);
      break;
    case 'AD':
      //Andorra
      return String.fromCodePoint(0x1F1E6, 0x1F1E9);
      break;
    case 'AO':
      //Angola
      return String.fromCodePoint(0x1F1E6, 0x1F1F4);
      break;
    case 'AI':
      //Anguilla
      return String.fromCodePoint(0x1F1E6, 0x1F1EE);
      break;
    case 'AQ':
      //Antarctica
      return String.fromCodePoint(0x1F1E6, 0x1F1F6);
      break;
    case 'AG':
      //Antigua and Barbuda
      return String.fromCodePoint(0x1F1E6, 0x1F1EC);
      break;
    case 'AR':
      //Argentina
      return String.fromCodePoint(0x1F1E6, 0x1F1F7);
      break;
    case 'AM':
      //Armenia
      return String.fromCodePoint(0x1F1E6, 0x1F1F2);
      break;
    case 'AW':
      //Aruba
      return String.fromCodePoint(0x1F1E6, 0x1F1FC);
      break;
    case 'AU':
      //Australia
      return String.fromCodePoint(0x1F1E6, 0x1F1FA);
      break;
    case 'AT':
      //Austria
      return String.fromCodePoint(0x1F1E6, 0x1F1F9);
      break;
    case 'AZ':
      //Azerbaijan
      return String.fromCodePoint(0x1F1E6, 0x1F1FF);
      break;
    case 'BS':
      //Bahamas
      return String.fromCodePoint(0x1F1E7, 0x1F1F8);
      break;
    case 'BH':
      //Bahrain
      return String.fromCodePoint(0x1F1E7, 0x1F1ED);
      break;
    case 'BD':
      //Bangladesh
      return String.fromCodePoint(0x1F1E7, 0x1F1E9);
      break;
    case 'BB':
      //Barbados
      return String.fromCodePoint(0x1F1E7, 0x1F1E7);
      break;
    case 'BY':
      //Belarus
      return String.fromCodePoint(0x1F1E7, 0x1F1FE);
      break;
    case 'BE':
      //Belgium
      return String.fromCodePoint(0x1F1E7, 0x1F1EA);
      break;
    case 'BZ':
      //Belize
      return String.fromCodePoint(0x1F1E7, 0x1F1FF);
      break;
    case 'BJ':
      //Benin
      return String.fromCodePoint(0x1F1E7, 0x1F1EF);
      break;
    case 'BM':
      //Bermuda
      return String.fromCodePoint(0x1F1E7, 0x1F1F2);
      break;
    case 'BT':
      //Bhutan
      return String.fromCodePoint(0x1F1E7, 0x1F1F9);
      break;
    case 'BO':
      //Bolivia
      return String.fromCodePoint(0x1F1E7, 0x1F1F4);
      break;
    ///Bonaire, Sint Eustatius and Saba (not found)
    case 'BA':
      //Bosnia & Herzegovina
      return String.fromCodePoint(0x1F1E7, 0x1F1E6);
      break;
    case 'BW':
      //Botswana
      return String.fromCodePoint(0x1F1E7, 0x1F1FC);
      break;
    case 'BV':
      //Bouvet Island
      return String.fromCodePoint(0x1F1E7, 0x1F1FB);
      break;
    case 'BR':
      //Brazil
      return String.fromCodePoint(0x1F1E7, 0x1F1F7);
      break;
    case 'IO':
      //British Indian Ocean Territory
      return String.fromCodePoint(0x1F1EE, 0x1F1F4);
      break;
    case 'BN':
      //Brunei Darussalam
      return String.fromCodePoint(0x1F1E7, 0x1F1F3);
      break;
    case 'BG':
      //Bulgaria
      return String.fromCodePoint(0x1F1E7, 0x1F1EC);
      break;
    case 'BF':
      //Burkina Faso
      return String.fromCodePoint(0x1F1E7, 0x1F1EB);
      break;
    case 'BI':
      //Burundi
      return String.fromCodePoint(0x1F1E7, 0x1F1EE);
      break;
    case 'CV':
      //Cape Verde
      return String.fromCodePoint(0x1F1E8, 0x1F1FB);
      break;
    case 'KH':
      //Cambodia
      return String.fromCodePoint(0x1F1F0, 0x1F1ED);
      break;
    case 'CM':
      //Cameroon
      return String.fromCodePoint(0x1F1E8, 0x1F1F2);
      break;
    case 'CA':
      //Canada
      return String.fromCodePoint(0x1F1E8, 0x1F1E6);
      break;
    case 'KY':
      //Cayman Islands
      return String.fromCodePoint(0x1F1F0, 0x1F1FE);
      break;
    case 'CF':
      //Central African Republic
      return String.fromCodePoint(0x1F1E8, 0x1F1EB);
      break;
    case 'TD':
      //Chad
      return String.fromCodePoint(0x1F1F9, 0x1F1E9);
      break;
    case 'CL':
      //Chile
      return String.fromCodePoint(0x1F1E8, 0x1F1F1);
      break;
    case 'CN':
      //China
      return String.fromCodePoint(0x1F1E8, 0x1F1F3);
      break;
    case 'CX':
      //Christmas Island
      return String.fromCodePoint(0x1F1E8, 0x1F1FD);
      break;
    case 'CC':
      //Cocos (Keeling) Islands
      return String.fromCodePoint(0x1F1E8, 0x1F1E8);
      break;
    case 'CO':
      //Colombia
      return String.fromCodePoint(0x1F1E8, 0x1F1F4);
      break;
    case 'KM':
      //Comoros
      return String.fromCodePoint(0x1F1F0, 0x1F1F2);
      break;
    case 'CG':
      //Congo - Brazzaville
      return String.fromCodePoint(0x1F1E8, 0x1F1EC);
      break;
    case 'CD':
      //Congo - Kinshasa
      return String.fromCodePoint(0x1F1E8, 0x1F1E9);
      break;
    case 'CK':
      //Cook Islands
      return String.fromCodePoint(0x1F1E8, 0x1F1F0);
      break;
    case 'CR':
      //Costa Rica
      return String.fromCodePoint(0x1F1E8, 0x1F1F7);
      break;
    case 'CI':
      //Côte d'Ivoire
      return String.fromCodePoint(0x1F1E8, 0x1F1EE);
      break;
    case 'HR':
      //Croatia
      return String.fromCodePoint(0x1F1ED, 0x1F1F7);
      break;
    case 'CU':
      //Cuba
      return String.fromCodePoint(0x1F1E8, 0x1F1FA);
      break;
    case 'CW':
      //Curaçao
      return String.fromCodePoint(0x1F1E8, 0x1F1FC);
      break;
    case 'CY':
      //Cyprus
      return String.fromCodePoint(0x1F1E8, 0x1F1FE);
      break;
    case 'CZ':
      //Czechia
      return String.fromCodePoint(0x1F1E8, 0x1F1FF);
      break;
    case 'DK':
      //Denmark
      return String.fromCodePoint(0x1F1E9, 0x1F1F0);
      break;
    case 'DJ':
      //Djibouti
      return String.fromCodePoint(0x1F1E9, 0x1F1EF);
      break;
    case 'DM':
      //Dominica
      return String.fromCodePoint(0x1F1E9, 0x1F1F2);
      break;
    case 'DO':
      //Dominican Republic
      return String.fromCodePoint(0x1F1E9, 0x1F1F4);
      break;
    case 'EC':
      //Ecuador
      return String.fromCodePoint(0x1F1EA, 0x1F1E8);
      break;
    case 'EG':
      //Egypt
      return String.fromCodePoint(0x1F1EA, 0x1F1EC);
      break;
    case 'SV':
      //El Salvador
      return String.fromCodePoint(0x1F1F8, 0x1F1FB);
      break;
    case 'GQ':
      //Equatorial Guinea
      return String.fromCodePoint(0x1F1EC, 0x1F1F6);
      break;
    case 'ER':
      //Eritrea
      return String.fromCodePoint(0x1F1EA, 0x1F1F7);
      break;
    case 'EE':
      //Estonia
      return String.fromCodePoint(0x1F1EA, 0x1F1EA);
      break;
    case 'SZ':
      //Eswatini
      return String.fromCodePoint(0x1F1F8, 0x1F1FF);
      break;
    case 'ET':
      //Ethiopia
      return String.fromCodePoint(0x1F1EA, 0x1F1F9);
      break;
    case 'FK':
      //Falkland Islands (Malvinas)
      return String.fromCodePoint(0x1F1EB, 0x1F1F0);
      break;
    case 'FO':
      //Faroe Islands
      return String.fromCodePoint(0x1F1EB, 0x1F1F4);
      break;
    case 'FJ':
      //Fiji
      return String.fromCodePoint(0x1F1EB, 0x1F1EF);
      break;
    case 'FI':
      //Finland
      return String.fromCodePoint(0x1F1EB, 0x1F1EE);
      break;
    case 'FR':
      //France
      return String.fromCodePoint(0x1F1EB, 0x1F1F7);
      break;
    case 'GF':
      //French Guiana
      return String.fromCodePoint(0x1F1EC, 0x1F1EB);
      break;
    case 'PF':
      //French Polynesia
      return String.fromCodePoint(0x1F1F5, 0x1F1EB);
      break;
    case 'TF':
      //French Southern Territories
      return String.fromCodePoint(0x1F1F9, 0x1F1EB);
      break;
    case 'GA':
      //Gabon
      return String.fromCodePoint(0x1F1EC, 0x1F1E6);
      break;
    case 'GM':
      //Gambia
      return String.fromCodePoint(0x1F1EC, 0x1F1F2);
      break;
    case 'GE':
      //Georgia
      return String.fromCodePoint(0x1F1EC, 0x1F1EA);
      break;
    case 'DE':
      //Germany
      return String.fromCodePoint(0x1F1E9, 0x1F1EA);
      break;
    case 'GH':
      //Ghana
      return String.fromCodePoint(0x1F1EC, 0x1F1ED);
      break;
    case 'GI':
      //Gibraltar
      return String.fromCodePoint(0x1F1EC, 0x1F1EE);
      break;
    case 'GR':
      //Greece
      return String.fromCodePoint(0x1F1EC, 0x1F1F7);
      break;
    case 'GL':
      //Greenland
      return String.fromCodePoint(0x1F1EC, 0x1F1F1);
      break;
    case 'GD':
      //Grenada 
      return String.fromCodePoint(0x1F1EC, 0x1F1E9);
      break;
    case 'GP':
      //Guadeloupe
      return String.fromCodePoint(0x1F1EC, 0x1F1F5);
      break;
    case 'GU':
      //Guam
      return String.fromCodePoint(0x1F1EC, 0x1F1FA);
      break;
    case 'GT':
      //Guatemala
      return String.fromCodePoint(0x1F1EC, 0x1F1F9);
      break;
    case 'GG':
      //Guernsey
      return String.fromCodePoint(0x1F1EC, 0x1F1EC);
      break;
    case 'GN':
      //Guinea
      return String.fromCodePoint(0x1F1EC, 0x1F1F3);
      break;
    case 'GW':
      //Guinea-Bissau
      return String.fromCodePoint(0x1F1EC, 0x1F1FC);
      break;
    case 'GY':
      //Guyana
      return String.fromCodePoint(0x1F1EC, 0x1F1FE);
      break;
    case 'HT':
      //Haiti
      return String.fromCodePoint(0x1F1ED, 0x1F1F9);
      break;
    case 'HM':
      //Heard Island and McDonald Islands
      return String.fromCodePoint(0x1F1ED, 0x1F1F2);
      break;
    case 'VA':
      //Vatican City (Holy See)
      return String.fromCodePoint(0x1F1FB, 0x1F1E6);
      break;
    case 'HN':
      //Honduras
      return String.fromCodePoint(0x1F1ED, 0x1F1F3);
      break;
    case 'HK':
      //Hong Kong
      return String.fromCodePoint(0x1F1ED, 0x1F1F0);
      break;
    case 'HU':
      //Hungary
      return String.fromCodePoint(0x1F1ED, 0x1F1FA);
      break;
    case 'IS':
      //Iceland
      return String.fromCodePoint(0x1F1EE, 0x1F1F8);
      break;
    case 'IN':
      //India
      return String.fromCodePoint(0x1F1EE, 0x1F1F3);
      break;
    case 'ID':
      //Indonesia
      return String.fromCodePoint(0x1F1EE, 0x1F1E9);
      break;
    case 'IR':
      //Iran
      return String.fromCodePoint(0x1F1EE, 0x1F1F7);
      break;
    case 'IQ':
      //Iraq  
      return String.fromCodePoint(0x1F1EE, 0x1F1F6);
      break;
    case 'IE':
      //Ireland
      return String.fromCodePoint(0x1F1EE, 0x1F1EA);
      break;
    case 'IM':
      //Isle of Man
      return String.fromCodePoint(0x1F1EE, 0x1F1F2);
      break;
    case 'IL':
      //Israel
      return String.fromCodePoint(0x1F1EE, 0x1F1F1);
      break;
    case 'IT':
      //Italy
      return String.fromCodePoint(0x1F1EE, 0x1F1F9);
      break;
    case 'JM':
      //Jamaica
      return String.fromCodePoint(0x1F1EF, 0x1F1F2);
      break;
    case 'JP':
      //Japan
      return String.fromCodePoint(0x1F1EF, 0x1F1F5);
      break;
    case 'JE':
      //Jersey
      return String.fromCodePoint(0x1F1EF, 0x1F1EA);
      break;
    case 'JO':
      //Jordan
      return String.fromCodePoint(0x1F1EF, 0x1F1F4);
      break;
    case 'KZ':
      //Kazakhstan
      return String.fromCodePoint(0x1F1F0, 0x1F1FF);
      break;
    case 'KE':
      //Kenya
      return String.fromCodePoint(0x1F1F0, 0x1F1EA);
      break;
    case 'KI':
      //Kiribati
      return String.fromCodePoint(0x1F1F0, 0x1F1EE);
      break;
    case 'KP':
      //North Korea
      return String.fromCodePoint(0x1F1F0, 0x1F1F5);
      break;
    case 'KR':
      //South Korea
      return String.fromCodePoint(0x1F1F0, 0x1F1F7);
      break;
    case 'KW':
      //Kuwait
      return String.fromCodePoint(0x1F1F0, 0x1F1FC);
      break;
    case 'KG':
      //Kyrgyzstan
      return String.fromCodePoint(0x1F1F0, 0x1F1EC);
      break;
    case 'LA':
      //Laos
      return String.fromCodePoint(0x1F1F1, 0x1F1E6);
      break;
    case 'LV':
      //Latvia
      return String.fromCodePoint(0x1F1F1, 0x1F1FB);
      break;
    case 'LB':
      //Lebanon
      return String.fromCodePoint(0x1F1F1, 0x1F1E7);
      break;
    case 'LS':
      //Lesotho
      return String.fromCodePoint(0x1F1F1, 0x1F1F8);
      break;
    case 'LR':
      //Liberia
      return String.fromCodePoint(0x1F1F1, 0x1F1F7);
      break;
    case 'LY':
      //Libya
      return String.fromCodePoint(0x1F1F1, 0x1F1FE);
      break;
    case 'LI':
      //Liechtenstein
      return String.fromCodePoint(0x1F1F1, 0x1F1EE);
      break;
    case 'LT':
      //Lithuania
      return String.fromCodePoint(0x1F1F1, 0x1F1F9);
      break;
    case 'LU':
      //Luxembourg
      return String.fromCodePoint(0x1F1F1, 0x1F1FA);
      break;
    case 'MO':
      //Macao
      return String.fromCodePoint(0x1F1F2, 0x1F1F4);
      break;
    case 'MK':
      //Macedonia
      return String.fromCodePoint(0x1F1F2, 0x1F1F0);
      break;
    case 'MG':
      //Madagascar
      return String.fromCodePoint(0x1F1F2, 0x1F1EC);
      break;
    case 'MW':
      //Malawi 
      return String.fromCodePoint(0x1F1F2, 0x1F1FC);
      break;
    case 'MY':
      //Malaysia
      return String.fromCodePoint(0x1F1F2, 0x1F1FE);
      break;
    case 'MV':
      //Maldives
      return String.fromCodePoint(0x1F1F2, 0x1F1FB);
      break;
    case 'ML':
      //Mali
      return String.fromCodePoint(0x1F1F2, 0x1F1F1);
      break;
    case 'MT':
      //Malta
      return String.fromCodePoint(0x1F1F2, 0x1F1F9);
      break;
    case 'MH':
      //Marshall Islands
      return String.fromCodePoint(0x1F1F2, 0x1F1ED);
      break;
    case 'MQ':
      //Martinique
      return String.fromCodePoint(0x1F1F2, 0x1F1F6);
      break;
    case 'MR':
      //Mauritania
      return String.fromCodePoint(0x1F1F2, 0x1F1F7);
      break;
    case 'MU':
      //Mauritius
      return String.fromCodePoint(0x1F1F2, 0x1F1FA);
      break;
    case 'YT':
      //Mayotte
      return String.fromCodePoint(0x1F1FE, 0x1F1F9);
      break;
    case 'MX':
      //Mexico
      return String.fromCodePoint(0x1F1F2, 0x1F1FD);
      break;
    case 'FM':
      //Micronesia
      return String.fromCodePoint(0x1F1EB, 0x1F1F2);
      break;
    case 'MD':
      //Moldova
      return String.fromCodePoint(0x1F1F2, 0x1F1E9);
      break;
    case 'MC':
      //Monaco
      return String.fromCodePoint(0x1F1F2, 0x1F1E8);
      break;
    case 'MN':
      //Mongolia
      return String.fromCodePoint(0x1F1F2, 0x1F1F3);
      break;
    case 'ME':
      //Montenegro
      return String.fromCodePoint(0x1F1F2, 0x1F1EA);
      break;
    case 'MS':
      //Montserrat
      return String.fromCodePoint(0x1F1F2, 0x1F1F8);
      break;
    case 'MA':
      //Morocco
      return String.fromCodePoint(0x1F1F2, 0x1F1E6);
      break;
    case 'MZ':
      //Mozambique
      return String.fromCodePoint(0x1F1F2, 0x1F1FF);
      break;
    case 'MM':
      //Myanmar
      return String.fromCodePoint(0x1F1F2, 0x1F1F2);
      break;
    case 'NA':
      //Namibia
      return String.fromCodePoint(0x1F1F3, 0x1F1E6);
      break;
    case 'NR':
      //Nauru
      return String.fromCodePoint(0x1F1F3, 0x1F1F7);
      break;
    case 'NP':
      //Nepal
      return String.fromCodePoint(0x1F1F3, 0x1F1F5);
      break;
    case 'NL':
      //Netherlands
      return String.fromCodePoint(0x1F1F3, 0x1F1F1);
      break;
    case 'NC':
      //New Caledonia
      return String.fromCodePoint(0x1F1F3, 0x1F1E8);
      break;
    case 'NZ':
      //New Zealand
      return String.fromCodePoint(0x1F1F3, 0x1F1FF);
      break;
    case 'NI':
      //Nicaragua
      return String.fromCodePoint(0x1F1F3, 0x1F1EE);
      break;
    case 'NE':
      //Niger
      return String.fromCodePoint(0x1F1F3, 0x1F1EA);
      break;
    case 'NG':
      //Nigeria
      return String.fromCodePoint(0x1F1F3, 0x1F1EC);
      break;
    case 'NU':
      //Niue
      return String.fromCodePoint(0x1F1F3, 0x1F1FA);
      break;
    case 'NF':
      //Norfolk Island
      return String.fromCodePoint(0x1F1F3, 0x1F1EB);
      break;
    case 'MP':
      //Northern Mariana Islands  
      return String.fromCodePoint(0x1F1F2, 0x1F1F5);
      break;
    case 'NO':
      //Norway
      return String.fromCodePoint(0x1F1F3, 0x1F1F4);
      break;
    case 'OM':
      //Oman
      return String.fromCodePoint(0x1F1F4, 0x1F1F2);
      break;
    case 'PK':
      //Pakistan
      return String.fromCodePoint(0x1F1F5, 0x1F1F0);
      break;
    case 'PW':
      //Palau
      return String.fromCodePoint(0x1F1F5, 0x1F1FC);
      break;
    case 'PS':
      //Palestine
      return String.fromCodePoint(0x1F1F5, 0x1F1F8);
      break;
    case 'PA':
      //Panama
      return String.fromCodePoint(0x1F1F5, 0x1F1E6);
      break;
    case 'PG':
      //Papua New Guinea
      return String.fromCodePoint(0x1F1F5, 0x1F1EC);
      break;
    case 'PY':
      //Paraguay
      return String.fromCodePoint(0x1F1F5, 0x1F1FE);
      break;
    case 'PE':
      //Peru
      return String.fromCodePoint(0x1F1F5, 0x1F1EA);
      break;
    case 'PH':
      //Philippines
      return String.fromCodePoint(0x1F1F5, 0x1F1ED);
      break;
    case 'PN':
      //Pitcairn
      return String.fromCodePoint(0x1F1F5, 0x1F1F3);
      break;
    case 'PL':
      //Poland
      return String.fromCodePoint(0x1F1F5, 0x1F1F1);
      break;
    case 'PT':
      //Portugal
      return String.fromCodePoint(0x1F1F5, 0x1F1F9);
      break;
    case 'PR':
      //Puerto Rico
      return String.fromCodePoint(0x1F1F5, 0x1F1F7);
      break;
    case 'QA':
      //Qatar
      return String.fromCodePoint(0x1F1F6, 0x1F1E6);
      break;
    case 'RE':
      //Réunion
      return String.fromCodePoint(0x1F1F7, 0x1F1EA);
      break;
    case 'RO':
      //Romania
      return String.fromCodePoint(0x1F1F7, 0x1F1F4);
      break;
    case 'RU':
      //Russia
      return String.fromCodePoint(0x1F1F7, 0x1F1FA);
      break;
    case 'RW':
      //Rwanda
      return String.fromCodePoint(0x1F1F7, 0x1F1FC);
      break;
    case 'BL':
      //Saint Barthélemy
      return String.fromCodePoint(0x1F1E7, 0x1F1F1);
      break;
    case 'SH':
      //Saint Helena
      return String.fromCodePoint(0x1F1F8, 0x1F1ED);
      break;
    case 'KN':
      //Saint Kitts and Nevis
      return String.fromCodePoint(0x1F1F0, 0x1F1F3);
      break;
    case 'LC':
      //Saint Lucia
      return String.fromCodePoint(0x1F1F1, 0x1F1E8);
      break;
    case 'MF':
      //Saint Martin (French part)
      return String.fromCodePoint(0x1F1F2, 0x1F1EB);
      break;
    case 'PM':
      //Saint Pierre and Miquelon
      return String.fromCodePoint(0x1F1F5, 0x1F1F2);
      break;
    case 'VC':
      //Saint Vincent and the Grenadines
      return String.fromCodePoint(0x1F1FB, 0x1F1E8);
      break;
    case 'WS':
      //Samoa
      return String.fromCodePoint(0x1F1FC, 0x1F1F8);
      break;
    case 'SM':
      //San Marino
      return String.fromCodePoint(0x1F1F8, 0x1F1F2);
      break;
    case 'ST':
      //Sao Tome and Principe
      return String.fromCodePoint(0x1F1F8, 0x1F1F9);
      break;
    case 'SA':
      //Saudi Arabia
      return String.fromCodePoint(0x1F1F8, 0x1F1E6);
      break;
    case 'SN':
      //Senegal
      return String.fromCodePoint(0x1F1F8, 0x1F1F3);
      break;
    case 'RS':
      //Serbia
      return String.fromCodePoint(0x1F1F7, 0x1F1F8);
      break;
    case 'SC':
      //Seychelles
      return String.fromCodePoint(0x1F1F8, 0x1F1E8);
      break;
    case 'SL':
      //Sierra Leone
      return String.fromCodePoint(0x1F1F8, 0x1F1F1);
      break;
    case 'SG':
      //Singapore
      return String.fromCodePoint(0x1F1F8, 0x1F1EC);
      break;
    case 'SX':
      //Sint Maarten (Dutch part)
      return String.fromCodePoint(0x1F1F8, 0x1F1FD);
      break;
    case 'SK':
      //Slovakia
      return String.fromCodePoint(0x1F1F8, 0x1F1F0);
      break;
    case 'SI':
      //Slovenia
      return String.fromCodePoint(0x1F1F8, 0x1F1EE);
      break;
    case 'SB':
      //Solomon Islands
      return String.fromCodePoint(0x1F1F8, 0x1F1E7);
      break;
    case 'SO':
      //Somalia
      return String.fromCodePoint(0x1F1F8, 0x1F1F4);
      break;
    case 'ZA':
      //South Africa
      return String.fromCodePoint(0x1F1FF, 0x1F1E6);
      break;
    case 'GS':
      //South Georgia and the South Sandwich Islands
      return String.fromCodePoint(0x1F1EC, 0x1F1F8);
      break;
    case 'SS':
      //South Sudan
      return String.fromCodePoint(0x1F1F8, 0x1F1F8);
      break;
    case 'ES':
      //Spain
      return String.fromCodePoint(0x1F1EA, 0x1F1F8);
      break;
    case 'LK':
      //Sri Lanka
      return String.fromCodePoint(0x1F1F1, 0x1F1F0);
      break;
    case 'SD':
      //Sudan
      return String.fromCodePoint(0x1F1F8, 0x1F1E9);
      break;
    case 'SR':
      //Suriname
      return String.fromCodePoint(0x1F1F8, 0x1F1F7);
      break;
    case 'SJ':
      //Svalbard and Jan Mayen
      return String.fromCodePoint(0x1F1F8, 0x1F1EF);
      break;
    case 'SE':
      //Sweden
      return String.fromCodePoint(0x1F1F8, 0x1F1EA);
      break;
    case 'CH':
      //Switzerland
      return String.fromCodePoint(0x1F1E8, 0x1F1ED);
      break;
    case 'SY':
      //Syria
      return String.fromCodePoint(0x1F1F8, 0x1F1FE);
      break;
    case 'TW':
      //Taiwan
      return String.fromCodePoint(0x1F1F9, 0x1F1FC);
      break;
    case 'TJ':
      //Tajikistan
      return String.fromCodePoint(0x1F1F9, 0x1F1EF);
      break;
    case 'TZ':
      //Tanzania
      return String.fromCodePoint(0x1F1F9, 0x1F1FF);
      break;
    case 'TH':
      //Thailand
      return String.fromCodePoint(0x1F1F9, 0x1F1ED);
      break;
    case 'TL':
      //Timor-Leste
      return String.fromCodePoint(0x1F1F9, 0x1F1F1);
      break;
    case 'TG':
      //Togo
      return String.fromCodePoint(0x1F1F9, 0x1F1EC);
      break;
    case 'TK':
      //Tokelau
      return String.fromCodePoint(0x1F1F9, 0x1F1F0);
      break;
    case 'TO':
      //Tonga
      return String.fromCodePoint(0x1F1F9, 0x1F1F4);
      break;
    case 'TT':
      //Trinidad & Tobago
      return String.fromCodePoint(0x1F1F9, 0x1F1F9);
      break;
    case 'TN':
      //Tunisia
      return String.fromCodePoint(0x1F1F9, 0x1F1F3);
      break;
    case 'TR':
      //Turkey
      return String.fromCodePoint(0x1F1F9, 0x1F1F7);
      break;
    case 'TM':
      //Turkmenistan
      return String.fromCodePoint(0x1F1F9, 0x1F1F2);
      break;
    case 'TC':
      //Turks & Caicos Islands
      return String.fromCodePoint(0x1F1F9, 0x1F1E8);
      break;
    case 'TV':
      //Tuvalu
      return String.fromCodePoint(0x1F1F9, 0x1F1FB);
      break;
    case 'UG':
      //Uganda
      return String.fromCodePoint(0x1F1FA, 0x1F1EC);
      break;
    case 'UA':
      //Ukraine
      return String.fromCodePoint(0x1F1FA, 0x1F1E6);
      break;
    case 'AE':
      //United Arab Emirates
      return String.fromCodePoint(0x1F1E6, 0x1F1EA);
      break;
    case 'GB':
      //United Kingdom (UK)
      return String.fromCodePoint(0x1F1EC, 0x1F1E7);
      break;
    case 'US':
      //United States of America
      return String.fromCodePoint(0x1F1FA, 0x1F1F8);
      break;
    case 'UY':
      //Uruguay
      return String.fromCodePoint(0x1F1FA, 0x1F1FE);
      break;
    case 'UZ':
      //Uzbekistan
      return String.fromCodePoint(0x1F1FA, 0x1F1FF);
      break;
    case 'VU':
      //Vanuatu
      return String.fromCodePoint(0x1F1FB, 0x1F1FA);
      break;
    case 'VE':
      //Venezuela
      return String.fromCodePoint(0x1F1FB, 0x1F1EA);
      break;
    case 'VN':
      //Vietnam
      return String.fromCodePoint(0x1F1FB, 0x1F1F3);
      break;
    case 'VG':
      //Virgin Islands (British)
      return String.fromCodePoint(0x1F1FB, 0x1F1EC);
      break;
    case 'VI':
      //Virgin Islands (U.S.)
      return String.fromCodePoint(0x1F1FB, 0x1F1EE);
      break;
    case 'WF':
      //Wallis & Futuna
      return String.fromCodePoint(0x1F1FC, 0x1F1EB);
      break;
    case 'EH':
      //Western Sahara
      return String.fromCodePoint(0x1F1EA, 0x1F1ED);
      break;
    case 'YE':
      //Yemen
      return String.fromCodePoint(0x1F1FE, 0x1F1EA);
      break;
    case 'ZM':
      //Zambia
      return String.fromCodePoint(0x1F1FF, 0x1F1F2);
      break;
    case 'ZW':
      //Zimbabwe
      return String.fromCodePoint(0x1F1FF, 0x1F1FC);
      break;
    default:
      return String.fromCodePoint(0x1F3F3);
  }
}
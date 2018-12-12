package hello;

import java.util.Queue;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.springframework.web.bind.annotation.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;
import static org.springframework.http.MediaType.*;


import org.json.JSONObject;
@RestController
public class ChatController {

    Queue<Message> messages = new ConcurrentLinkedQueue<Message>();

    // Our client is not on the same server, so we need to
    @CrossOrigin // allow request from all origins
    @RequestMapping(value="/api/new-message",
                    method = RequestMethod.POST,
                    consumes = TEXT_PLAIN_VALUE)
    public void newMessage(@RequestBody String fullMessage) {
        JSONObject fullMessageParsed = new JSONObject(fullMessage);
        Message m = new Message(fullMessageParsed.getString("txt"),fullMessageParsed.getString("user"));
        System.out.println(m.getText());
        System.out.println(m.getUser());

        messages.add(m);
        //chatBotReponse(text);
    }

    //Simple chatbot
    void chatBotReponse (String text, String user) {
        if (text.equals("meteo")) {
            Message reponse = new Message("Il pleut : "+text, "Robot");
            messages.add(reponse);
        }
    }


    // Our client is not on the same server, so we need to
    @CrossOrigin // allow request from all origins
    @GetMapping("/api/messages")
    // same as     @RequestMapping(value = "/api/messages",
    //                             method = RequestMethod.GET)
    public Queue<Message> messages() {
        return messages;
    }


    @GetMapping("/testing/")   
    public String random() {
        return "test";
    }
}

package hello;

import java.util.Queue;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.springframework.web.bind.annotation.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;
import static org.springframework.http.MediaType.*;


@RestController
public class ChatController {

    Queue<Message> messages = new ConcurrentLinkedQueue<Message>();

    // Our client is not on the same server, so we need to
    @CrossOrigin // allow request from all origins
    @RequestMapping(value="/api/new-message",
                    method = RequestMethod.POST,
                    consumes = TEXT_PLAIN_VALUE)
    public void newMessage(@RequestBody String text) {
        Message m = new Message(text);
        System.out.println(m.getText());
        messages.add(m);

    //Call the simple robot
    chatBotReponse(text);
    }

    //Simple chatbot for testing
    void chatBotReponse (String text) {
        if (text.equals("meteo")) {
            Message reponse = new Message(text+" : Il pleut");
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
}

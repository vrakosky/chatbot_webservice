package hello;

import java.util.Date;

public class Message {

    // once assigned, never changes
    private final Date date;
    private final String txt;

    /**
       Creates a message using a given String and the current date
    **/
    public Message(String message) {
        this.date = new Date();
        this.txt = message;
    }
        
    public Date getDate() {
        return date;
    }

    public String getText() {
        return txt;
    }
}

package hello;

import java.util.Date;

public class Message {

    // once assigned, never changes
    private final String txt;
    private final Date date;
    private final String user;

    /**
       Creates a message using a given String and the current date
    **/
    public Message(String message, String user) {
        this.date = new Date();
        this.txt = message;
        this.user = user;

    }
        
    public Date getDate() {
        return date;
    }

    public String getText() {
        return txt;
    }

    public String getUser() {
        return user;
    }
}

#Chatapplication
## Node.js Chat Application Documentation

This Node.js chat application allows users to join a chat room by entering their username and send messages in real-time to all connected users.

### Features:

- **Username Entry:** Users can enter their desired username before joining the chat.
- **Real-time Messaging:** Users can send and receive messages in real-time.
- **Message Storage:** Messages are stored in an SQLite database for future reference.

### Usage Instructions:

1. **Setup:**

   - Ensure you have Node.js installed on your machine.

2. **Installation:**

   - Clone or download the repository containing the chat application files.

3. **Install Dependencies:**

   - Run `npm install` to install the required dependencies.

4. **Run the Application:**

   - Execute `node server.js` to start the server. The application will run on `http://localhost:3000`.

5. **Join the Chat:**

   - Access the application through a web browser.
   - Enter a username in the provided input field and click "Enter Chat."

6. **Messaging:**

   - Type a message in the text box at the bottom of the chat interface.
   - Click the "Send" button to send your message to the chat.

7. **Disconnect:**

   - Close the browser or navigate away from the application to disconnect from the chat.

### File Structure:

- **`server.js`**: Contains the Node.js server code handling the chat functionality and SQLite database operations.
- **`public/index.html`**: HTML file for the chat interface.
- **`public/script.js`**: JavaScript file handling client-side interactions and socket connections.
- **`public/styles.css`**: CSS file defining styles for the chat interface.

### Dependencies:

- **Express**: Web framework for Node.js.
- **Socket.IO**: Library for real-time, bidirectional, and event-based communication.
- **SQLite3**: SQLite database driver for Node.js.
Absolutely, let's break down the code for your Node.js chat application and provide a step-by-step explanation:

### HTML (index.html):

- **Structure:** 
  - Defines the structure of the chat interface using HTML elements like `div`, `input`, and `button`.
  - Contains two main sections: one for entering the username and another for the chat box.

### CSS (styles.css):

- **Styling:**
  - Provides styles for various elements to create a visually appealing chat interface.
  - Defines the layout, fonts, colors, and other visual aspects of the application.

### Client-Side JavaScript (script.js):

1. **Socket Connection Setup:**
   - Initializes a connection to the server using Socket.IO.
   - Defines functions for handling chat-related actions.

2. **`enterChat()` Function:**
   - Triggered when a user clicks "Enter Chat."
   - Validates the entered username and emits a 'join' event to the server.
   - Hides the username entry form and displays the chat interface.

3. **`sendMessage()` Function:**
   - Triggered when a user clicks the "Send" button after typing a message.
   - Sends the message content to the server by emitting a 'chat message' event.

4. **Socket Event Handling (`'chat message'`):**
   - Listens for incoming messages from the server with the `'chat message'` event.
   - Creates HTML elements for messages and appends them to the message area, displaying them in the chat box.
   - Automatically scrolls the message area to show the latest messages.

### Server-Side JavaScript (server.js):

1. **Server Setup:**
   - Sets up an Express server and creates an HTTP server using `http.createServer`.
   - Initializes Socket.IO to work with the HTTP server.

2. **Database Initialization (SQLite):**
   - Uses SQLite3 to create a SQLite database (`database.db`) if it doesn't exist.
   - Defines a `messages` table with columns for `id`, `username`, and `message`.

3. **Socket Connection Handling:**
   - Listens for incoming socket connections.
   - Handles various socket events like `'join'`, `'chat message'`, and `'disconnect'`.

4. **`'join'` Event Handling:**
   - Triggered when a user joins the chat by emitting the `'join'` event from the client.
   - Broadcasts a message to all connected clients indicating that a new user has joined.

5. **`'chat message'` Event Handling:**
   - Triggered when a user sends a chat message.
   - Emits the received message to all connected clients, including the sender's username.
   - Inserts the message into the SQLite database for storage.

6. **`'disconnect'` Event Handling:**
   - Triggered when a user disconnects from the chat.
   - Broadcasts a message to all clients indicating that the user has left the chat.

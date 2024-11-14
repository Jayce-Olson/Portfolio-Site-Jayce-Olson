package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// I am still learning Go so there is about to be a LOT of comments

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func handleContactRequest(write http.ResponseWriter, req *http.Request) { // The req object is the request from the client. The write object is used to write a response back to the client.

	//log.Println(req)

	if req.Method != http.MethodPost { // .Method accesses the method part of the request (Whether it is Get/Post/Whatever else ther is)
		http.Error(write, "Only POST is allowed", http.StatusMethodNotAllowed) // If the Method is not Post (In this situation I am looking to recieve contact data) http.error is called to return an error to the client.
		// http.Error takes three parameters: Error(w http.ResponseWriter, error string, code int)
		return // End execution of function
	}
	var request ContactRequest // This defines the variable "request" of type ContactRequest. The type was defined in the struct earlier
	/* Below, I am still new to Golang so at first this seemed kind of trippy but basically below is saying if err being set equal to json.decoder causes it to not be
	set to nil, proceed. Kind of different but I like it. It is like that error people make when first programming when they accidetnly use = instead of == when comparing
	values. Anyways, this is basically shorthand for:

	var err := json.NewDecoder(req.Body).Decode(&request)
	if err != nil {
		stuff
	}

	As for json.NewDecoder(req.Body).Decode(&request). I have a good bit to say about this but to start, this is basically:

	json.NewDecoder() takes an io.reader object as a parameter and returns a Decoder object specifically for the io.reader object passed through.
	Technically, from what I am finding out, I do not need this as the data that I am recieving is minimal and creating a decoder specifically for
	my io.reader object would be for streaming large amounts of data, which I don't have. Looking at the alternitives, it seems this way is ideal
	because it avoids loading the entire json message into memory, it seems this way it reads what it needs, then uses the memory space it doesn't
	need anymore to stream the next piece of data.
	*/
	/* This next part was trippy coming from most other languages. Apparently, err is not being set equal to the object that NewDecoder maeks. I originally wanted
	to name err "Decoder" because that made more sense but then I asked my senior engineer (chatGPT) some more questions and supposedly part of why I need to pass
	through request as a pointer is because that is where the data is being returned to, not err. But! if I just did json.NewDecoder(req.Body) then the return type
	would be of the object decoder object. Hoever when I do json.NewDecoder(req.Body).Decode(&request) the return type is of type error.

	so I did some fiddle sticking and modified it slighlty in case I wanted to use the decoder in the future.req

	Old statement:
		if err := json.NewDecoder(req.Body).Decode(&request); err != nil {
	new statement:
	*/
	decoder := json.NewDecoder(req.Body) // i'm basically a pro now
	// log.Println(decoder)
	if err := decoder.Decode(&request); err != nil {
		http.Error(write, "Invalid request", http.StatusBadRequest)
		return
	}
	// Handle email sending and backup here (Where I am going to put thing logic to process the data from the post)
	// ...
	log.Println(request.Email)

	write.WriteHeader(http.StatusOK) // Write back a 200 code saying basically saying "we good" to the client
	// fmt.Fprintf(write, "Contact request received") // This formats the write object with the header of "Contact request received". This was trippy to me at first too because the word "print" made me think it printed something, but it doesn't, it just formats it.
	response := map[string]string{"message": "Contact request received"}
	json.NewEncoder(write).Encode(response)
	// This was also quite trippy to me. I assumed there would be something to call in order to send the write object back to the client but
	// apparently when the handler function ends, the write object response if automatically sent back to the client, there is apparently no
	// need for manually sending it back to the client. This is a neat language and library, definelty different from what i'm used to. I
	// do like Golang though.
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight OPTIONS request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pass to the next handler if it's not an OPTIONS request
		next.ServeHTTP(w, r)
	})
}

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/contact", handleContactRequest) // registers new route "/contact" and calls the callback function when a request is made (handleContactRequest)
	httpServer := corsMiddleware(mux)

	// The line below calls a function from the http library that takes two parameters, an endpoint of type string, and a function.
	// HandleFunc will execute the passed through function whenever a request is made to the passed through endpoint. The passed through
	// function will get the request and write parameters.
	// http.HandleFunc("/contact", handleContactRequest)
	// Below just logs that the server was started
	// go func() { // I am running the server on port 443 on a new thread so I can run http on a seperate thread for testing. I love go's concurrency <3
	// 	log.Println("Server started on port 443")
	// 	// Below logs and starts a server listening on port 443, passes through the paths to the TLS certificate and key. The last argument is for a custom http handler.
	// 	// Passing through nil defaults the handler to what I passed through HandleFunc
	// 	// log.Fatal(http.ListenAndServeTLS(":443", "server.crt", "server.key", httpServer)) // HTTPS enabled server
	// }()

	log.Println("Starting HTTP server on port 80")
	// log.Fatal(http.ListenAndServeTLS(":443", "server.crt", "server.key", httpServer)) // Once I have certificates I will use this
	log.Fatal(http.ListenAndServe(":80", httpServer)) // use this for testing
}

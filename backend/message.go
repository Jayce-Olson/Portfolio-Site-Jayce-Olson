// In telegram.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

/* I am still learning Go, so this file is going to be commented like crazy */

/* This function is for sending my (or any) telegram bot a message */
// Apparently when capatilizing the first letter of anything (variable, struct, function) in Go it becomes exported
func SendTelegramMessage(message string) error { // This file is just for my portfolio bot so my only parameter is message, in the future if I wanted to make this for any bot/chat id I would make those part of the parameters, right now I only need it for this bot though
	botToken := os.Getenv("TELEGRAM_BOT_TOKEN") // retrieve token from environment variables for security
	chatID := os.Getenv("TELEGRAM_CHAT_ID")     // retrieve token from environment variables for privacy
	fmt.Println(botToken)
	fmt.Println(chatID)
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", botToken) // Format the url to include the botToken
	payload := map[string]string{                                              // This is a dictionary in Go (called a map in Go). Looks wack at first but it actually makes sense map[keyType]valueType{key:value}
		"chat_id": chatID,  // The reason this is being put in a dictionary/map is because the telegram api expects json data (it will access "chat_id" and "text")
		"text":    message, // Also apparently in Go, maps can be easily converted to Json. Another thing I like about Go. Exibit A below:
	}
	// Below returns an encoded byte slice and and err
	payloadBytes, err := json.Marshal(payload) // Exibit A - you can also apparently return multiple values in Go which is cool
	if err != nil {                            // Check for error
		return err
	}
	// The 3rd parameter in the below method takes an Io.reader object (or one that implements Io.reader), which is why it needs to be encoded to a buffer. The request itself will not be in buffer format
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes)) // This creates and returns an object of type *http.request (it also returns an error for the second value)
	if err != nil {                                                         // Check for error
		return err
	}
	req.Header.Set("Content-Type", "application/json") // I should probably learn a bit more about the anatomy of an http request but this method sets the header of the request.
	// The above takes key-value parameters for the type of header and the name, which indicates something. In this case application/json indicates that the https body contains json data

	client := &http.Client{}    // This creates a new instance of client for sending http requests the {} is for changing the default configuration like adding a timeout {Timeout: 10*time.second,}
	resp, err := client.Do(req) // This is how an http request is sent using Go's http client
	// resp holds the response from the server
	if err != nil {
		return err
	}
	/*
		Below is supposedly a key part of handleing http requests in Go. It works by using defer, which in Go is a way of having something run after the surrounding
		function is ran. This ensures that the response body will be closed, which means that all resources such as network connections and memory buffers. Withou doing
		this the number of connections Go is able to handle may be limited */
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK { // Check the response status code for anything that isn't 200 OK
		return fmt.Errorf("error: received non-OK HTTP status %s", resp.Status)
	}

	fmt.Println("Message sent successfully to Telegram!")
	return nil // The line with defer from earlier will be ran after this
}

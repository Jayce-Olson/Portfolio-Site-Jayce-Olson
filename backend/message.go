// In telegram.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

/* I am still learning Go, so this file is going to be commented like crazy */

/* This function is for sending my (or any) telegram bot a message */
// Apparently when capatilizing the first letter of anything (variable, struct, function) in Go it becomes exported
func SendTelegramMessage(botToken string, chatID string, message string) error { // Parameters require the botToken and chatId for telegram, as well as the message, I may change this in the future.
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

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("error: received non-OK HTTP status %s", resp.Status)
	}

	fmt.Println("Message sent successfully to Telegram!")
	return nil
}

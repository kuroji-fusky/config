package main

import (
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	url := "<https://sslproxies.org/>"

	res, err := http.Get(url)

	if err != nil {
		panic(err)
	}

	defer res.Body.Close()

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		panic(err)
	}
}

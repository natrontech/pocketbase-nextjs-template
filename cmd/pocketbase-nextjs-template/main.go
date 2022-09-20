package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
)

func main() {
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir: "/data",
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir: "/data",
	})

	// will serve the nextjs app from /web/app
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.Static("/", "web")

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

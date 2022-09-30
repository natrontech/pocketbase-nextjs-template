package server

import (
	"github.com/natrongmbh/pocketbase-nextjs-template/pkg/env"
	"github.com/pocketbase/pocketbase"
)

func Setup() *pocketbase.PocketBase {
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir:       env.POCKETBASE_DATA_DIR,
		DefaultEncryptionEnv: env.POCKETBASE_ENCRYPTION_KEY,
	})

	return app
}

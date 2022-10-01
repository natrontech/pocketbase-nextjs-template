package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

// Auto generated migration with the most recent collections configuration.
func InitCollections() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `[
			{
				"id": "systemprofiles0",
				"name": "profiles",
				"system": true,
				"listRule": "userId = @request.user.id",
				"viewRule": "userId = @request.user.id",
				"createRule": "userId = @request.user.id",
				"updateRule": "userId = @request.user.id",
				"deleteRule": null,
				"schema": [
					{
						"id": "pbfielduser",
						"name": "userId",
						"type": "user",
						"system": true,
						"required": true,
						"unique": true,
						"options": {
							"maxSelect": 1,
							"cascadeDelete": true
						}
					},
					{
						"id": "pbfieldname",
						"name": "name",
						"type": "text",
						"system": false,
						"required": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "pbfieldavatar",
						"name": "avatar",
						"type": "file",
						"system": false,
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif"
							],
							"thumbs": null
						}
					}
				]
			},
			{
				"id": "74o5ynevh4a1vml",
				"name": "tests",
				"system": false,
				"listRule": null,
				"viewRule": null,
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"schema": [
					{
						"id": "9ddpluzl",
						"name": "name",
						"type": "text",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"id": "qhg888db",
						"name": "version",
						"type": "number",
						"system": false,
						"required": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null
						}
					}
				]
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		// no revert since the configuration on the environment, on which
		// the migration was executed, could have changed via the UI/API
		return nil
	})
}

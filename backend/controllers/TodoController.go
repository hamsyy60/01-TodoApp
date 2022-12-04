package controllers

import (
	"backend/models"
	"github.com/gofiber/fiber/v2"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"strconv"
)

func InitControllers(app *fiber.App, db gorm.DB) {

	app.Get(givePath("greeting", 1), func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Post(givePath("todo", 1), func(ctx *fiber.Ctx) error {
		payload := models.Todo{}

		if err := ctx.BodyParser(&payload); err != nil {
			return ctx.JSON(err)
		}

		payload.ID = uuid.NewV4()

		db.Create(payload)
		return ctx.JSON("Successfully created new Task")
	})
	app.Get(givePath("todo/:id?", 1), func(ctx *fiber.Ctx) error {
		id := uuid.FromStringOrNil(ctx.Params("id"))
		classic := false
		if uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000") == id || id == uuid.Nil {
			classic = true
		}

		if classic {
			var todos []models.Todo
			db.Find(&todos)

			return ctx.Status(200).JSON(todos)

		} else {
			data := models.Todo{}
			db.First(&data, "id = ?", id)
			return ctx.JSON(data)
		}

	})

	app.Post(givePath("todo/changestatus", 1), func(ctx *fiber.Ctx) error {
		payload := models.Todo{}

		if err := ctx.BodyParser(&payload); err != nil {
			return ctx.JSON(err)
		}

		db.Model(&models.Todo{}).Where("id = ?", payload.ID).Update("status", payload.Status)

		return ctx.JSON("Successfully changed Status")
	})

}

func givePath(path string, version int) string {
	str := "api/v" + strconv.Itoa(version) + "/" + path

	return str
}

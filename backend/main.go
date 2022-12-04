package main

import (
	"backend/controllers"
	"backend/database"
	"backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database := database.InitDatabase()

	database.AutoMigrate(&models.Todo{})

	app := fiber.New()

	app.Use(cors.New())

	controllers.InitControllers(app, database)

	app.Listen(":3001")
}

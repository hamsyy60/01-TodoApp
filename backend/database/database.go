package database

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
)

func initEnvVariables() {
	err := godotenv.Load("/Users/kilinc/Code/PersonalProjects/01_TodoApp/backend/.env")

	if err != nil {
		panic("COULD NOT LOAD .env VARIABLES")
	}
}

func InitDatabase() gorm.DB {
	initEnvVariables()
	fmt.Println("#" + os.Getenv("DSN"))
	Db, err := gorm.Open(mysql.Open(os.Getenv("DSN")))
	if err != nil {
		panic("An Error occurred while connecting to the Database ")
	}
	return *Db
}

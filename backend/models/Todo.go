package models

import uuid "github.com/satori/go.uuid"

type Todo struct {
	ID        uuid.UUID `json:"id" gorm:"type:char(36);primary_key" `
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Status    int8      `json:"status"`
	CreatedAt string    `json:"createdAt"`
}

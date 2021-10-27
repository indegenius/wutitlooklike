
# Project 2: CRUD Bucket
#### By Ras Au-t Amam

## Project Summary

I will be building "crud bucket" which shows images from user with associated hyperlink

## Models

List here any models in your app and their properties
"{
    image: string
    country: string
    Message: string
}"

## Route Table

List your routes in a table

| url | method | action |
|-----|--------|--------|
| / | get | get all capsules (index)|
| /capsule/:id | get | get a particular capsule (show)|
|/new | get | add a pic
|/ | post |create capsule
|/:id| delete | remove capsule
|/:id/edit| post | edit capsule
|/:id| put | update capsule




## User Stories
user types URL of shared image (ie:imgur)
user types message
user selects country dropdown
User presses "submit capsule"

## Challenges

- resize images

## List of Technologies
mongo
Express
liquid

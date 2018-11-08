import requests

API_URL = "http://localhost:5000/"

# sample user
sample_user = {
    "email": "davidchang@chegg.com",
    "name": "David Chang",
    "password": "iwearcrocseveryday",
}

# create a user
r = requests.post(API_URL + "register", json=sample_user)
result = r.json()["result"]
print(result)
user_token = result["token"]

# sample book
sample_book = {
    "name": "The Adventures of Huckleberry Finn",
    "author": "Mark Twain",
    "grade": 8,
    "year": 2018,
    "cover_url": "https://cdn3.volusion.com/jtoq7.b7owf/v/vspfiles/photos/ADVENTURES_OF_HUCKLEBERRY_FINN-2.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=sample_book)
print(r.json())

# sample quizzes
sample_quiz = {
    "name": "Huck Finn Quiz 1",
    "book_id": 1,
    "questions": [
        {
            "text": "Who wrote Huckleberry Finn?",
            "options": ["Mark Twain", "JK Rowling", "Steinbeck", "Tony Morrison"],
            "correct_option": "Mark Twain",
        },
        {
            "text": "Who is Huckleberry Finn's Best Friend?",
            "options": ["Tom Sawyer", "His dad", "Jake Wiggins", "His dog"],
            "correct_option": "Tom Sawyer",
        },
    ],
}
r = requests.post(API_URL + "quiz", json=sample_quiz)
print(r.json())

# sample quiz 2
sample_quiz = {
    "name": "Huck Finn Quiz 2",
    "book_id": 1,
    "questions": [
        {
            "text": "Who wrote Chuckleberry Finn?",
            "options": ["Mark Twain", "JK Rofling", "Steinbeck", "Tony Morrison"],
            "correct_option": "Mark Twain",
        },
        {
            "text": "Who is Chuckleberry Finn's Best Friend?",
            "options": ["Tom Sawyer", "His dad", "Jake Wiggins", "His cat"],
            "correct_option": "Tom Sawyer",
        },
    ],
}
r = requests.post(API_URL + "quiz", json=sample_quiz)
print(r.json())

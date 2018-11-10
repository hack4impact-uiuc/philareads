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
user_token = result["auth_token"]

# sample books
huckfinn_book = {
    "name": "The Adventures of Huckleberry Finn",
    "author": "Mark Twain",
    "grade": 8,
    "year": 2018,
    "cover_url": "https://cdn3.volusion.com/jtoq7.b7owf/v/vspfiles/photos/ADVENTURES_OF_HUCKLEBERRY_FINN-2.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=huckfinn_book)
print(r.json())

# grade 8 books
wishtree_book = {
    "name": "Wishtree",
    "author": "Katherine Applegate",
    "grade": 8,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/61al%2BP%2B9JDL._SX365_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=wishtree_book)
print(r.json())

boycalledbat_book = {
    "name": "A Boy Called Bat",
    "author": "Elana Arnold",
    "grade": 8,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51ZW6vJvuIL._SX349_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=boycalledbat_book)
print(r.json())

rubyonoutside_book = {
    "name": "Ruby on the Outside",
    "author": "Nora Raleigh Baskin",
    "grade": 8,
    "year": 2019,
    "cover_url": "https://images.gr-assets.com/books/1425975367l/23309730.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=rubyonoutside_book)
print(r.json())

pashmina_book = {
    "name": "Pashmina",
    "author": "Nidhi Chanani",
    "grade": 8,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/91qAL9ZLi9L.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=pashmina_book)
print(r.json())

losersclub_book = {
    "name": "The Losers' Club",
    "author": "Andrew Clements",
    "grade": 8,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/515gx6DaIfL._SX329_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=losersclub_book)
print(r.json())

# Books for grade 4
serafinablackcloak_book = {
    "name": "Serafina and the Black Cloak",
    "author": "Robert Beatty",
    "grade": 4,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51eWzYTXg6L._SX339_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=serafinablackcloak_book)
print(r.json())

warifinallywon_book = {
    "name": "The War I Finally Won",
    "author": "Kimberly Brubaker Bradley",
    "grade": 4,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51pLVzrgzGL._SX329_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=warifinallywon_book)
print(r.json())

waitingfornormal_book = {
    "name": "Waiting for Normal",
    "author": "Leslie Connor",
    "grade": 4,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51RM53p%2B91L._SX334_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=waitingfornormal_book)
print(r.json())

onlyroad_book = {
    "name": "The Only Road",
    "author": "Alexandra Diaz",
    "grade": 4,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51m1ZQW37cL._SX329_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=onlyroad_book)
print(r.json())

awfulfalafel_book = {
    "name": "It Ain't So Awful, Falafel",
    "author": "Firoozeh Dumas",
    "grade": 4,
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51miMQ66exL._SX333_BO1,204,203,200_.jpg",
    "reader_url": "google.com",
}
r = requests.post(API_URL + "book", json=awfulfalafel_book)
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

# wish tree quiz
wishtree1_quiz = {
    "name": "Wish Tree Quiz 1",
    "book_id": 2,
    "questions": [
        {
            "text": "In the beginning the narrator is introduced as?",
            "options": ["Samar", "Red, a 200-year-old oak tree", "Bongo", "Francesca"],
            "correct_option": "Red, a 200-year-old oak tree",
        },
        {
            "text": "Which time of year do people write down their wishes for Red?",
            "options": ["June 1st", "Christmas", "May 1st", "Every Monday Morning"],
            "correct_option": "May 1st",
        },
        {
            "text": "What does Samar wish for?",
            "options": [
                "An A on CS 233 Exam",
                "A friend",
                "Her mother to recover from sickness",
                "Acceptance into the philaReads dev team",
            ],
            "correct_option": "A friend",
        },
    ],
}
r = requests.post(API_URL + "quiz", json=wishtree1_quiz)
print(r.json())

# wish tree quiz
wishtree2_quiz = {
    "name": "Wish Tree Quiz 2",
    "book_id": 2,
    "questions": [
        {
            "text": "What is the name of the Irish orphan that arrived in 1848",
            "options": ["Maeve", "Ciara", "Anna", "Siobhan"],
            "correct_option": "Maeve",
        },
        {
            "text": "What does the name of the adopted child 'Amadora' mean?",
            "options": [
                "Gift of life",
                "Gift of hope",
                "Gift of love",
                "Gift of strength",
            ],
            "correct_option": "Gift of love",
        },
        {
            "text": "The arborists choose to do what to Red?",
            "options": ["Chop it down", "Write wishes on it", "Preserve it"],
            "correct_option": "Chop it down",
        },
    ],
}
r = requests.post(API_URL + "quiz", json=wishtree2_quiz)
print(r.json())

# wish tree quiz
wishtree3_quiz = {
    "name": "Wish Tree Quiz 3",
    "book_id": 2,
    "questions": [
        {
            "text": "In response to the arborists what does Stephen and his classmates write on Red",
            "options": ["STAY", "GOODBYE", "FAREWELL", "DONT LEAVE"],
            "correct_option": "STAY",
        },
        {
            "text": "What does Francesca read to ultimately change her mind about chopping down Red",
            "options": [
                "Maeve's journal",
                "A letter written by Stephen's classmates",
                "The wishes on Red",
            ],
            "correct_option": "Maeve's journal",
        },
        {
            "text": "In the end who does Samar become good friends with?",
            "options": ["Red", "Francesca", "Bongo", "Stephen"],
            "correct_option": "Stephen",
        },
    ],
}
r = requests.post(API_URL + "quiz", json=wishtree3_quiz)
print(r.json())

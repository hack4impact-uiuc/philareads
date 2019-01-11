import requests

API_URL = "http://localhost:5000/api/"

# sample user
sample_user = {
    "username": "future_pm",
    "name": "David Chang",
    "password": "iwearcrocseveryday",
}

# create a user
r = requests.post(API_URL + "register", json=sample_user)
result = r.json()["result"]
print(result)
user_token = result["auth_token"]
credentials = {"jwt": user_token}

# make david chang the admin
print("making David Chang an admin")
from api import create_app
from api.models import db, User

app = create_app()
app.app_context().push()
david_chang = User.query.get(1)
# verify that david chang exists
if david_chang is not None:
    david_chang.is_admin = True
    db.session.commit()
else:
    print("David Chang was not created correctly :(")

# sample books
huckfinn_book = {
    "name": "The Adventures of Huckleberry Finn",
    "author": "Mark Twain",
    "grade": "Intermediate",
    "year": 2018,
    "cover_url": "https://cdn3.volusion.com/jtoq7.b7owf/v/vspfiles/photos/ADVENTURES_OF_HUCKLEBERRY_FINN-2.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=huckfinn_book, cookies=credentials)
print(r.json())

# grade 8 books
wishtree_book = {
    "name": "Wishtree",
    "author": "Katherine Applegate",
    "grade": "Intermediate",
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/61al%2BP%2B9JDL._SX365_BO1,204,203,200_.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=wishtree_book, cookies=credentials)
print(r.json())

boycalledbat_book = {
    "name": "A Boy Called Bat",
    "author": "Elana Arnold",
    "grade": "Intermediate",
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51ZW6vJvuIL._SX349_BO1,204,203,200_.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=boycalledbat_book, cookies=credentials)
print(r.json())

rubyonoutside_book = {
    "name": "Ruby on the Outside",
    "author": "Nora Raleigh Baskin",
    "grade": "Intermediate",
    "year": 2019,
    "published": True,
}
r = requests.post(API_URL + "book", json=rubyonoutside_book, cookies=credentials)
print(r.json())

pashmina_book = {
    "name": "Pashmina",
    "author": "Nidhi Chanani",
    "grade": "Intermediate",
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/91qAL9ZLi9L.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=pashmina_book, cookies=credentials)
print(r.json())

losersclub_book = {
    "name": "The Losers' Club",
    "author": "Andrew Clements",
    "grade": "Intermediate",
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/515gx6DaIfL._SX329_BO1,204,203,200_.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=losersclub_book, cookies=credentials)
print(r.json())

# Books for grade 4
serafinablackcloak_book = {
    "name": "Serafina and the Black Cloak",
    "author": "Robert Beatty",
    "grade": "Middle",
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51eWzYTXg6L._SX339_BO1,204,203,200_.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=serafinablackcloak_book, cookies=credentials)
print(r.json())

warifinallywon_book = {
    "name": "The War I Finally Won",
    "author": "Kimberly Brubaker Bradley",
    "grade": "Middle",
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51pLVzrgzGL._SX329_BO1,204,203,200_.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=warifinallywon_book, cookies=credentials)
print(r.json())

waitingfornormal_book = {
    "name": "Waiting for Normal",
    "author": "Leslie Connor",
    "grade": "Middle",
    "year": 2019,
    "published": True,
}
r = requests.post(API_URL + "book", json=waitingfornormal_book, cookies=credentials)
print(r.json())

onlyroad_book = {
    "name": "The Only Road",
    "author": "Alexandra Diaz",
    "grade": "Middle",
    "year": 2019,
    "published": True,
}
r = requests.post(API_URL + "book", json=onlyroad_book, cookies=credentials)
print(r.json())

awfulfalafel_book = {
    "name": "It Ain't So Awful, Falafel",
    "author": "Firoozeh Dumas",
    "grade": "Middle",
    "year": 2019,
    "cover_url": "https://images-na.ssl-images-amazon.com/images/I/51miMQ66exL._SX333_BO1,204,203,200_.jpg",
    "published": True,
}
r = requests.post(API_URL + "book", json=awfulfalafel_book, cookies=credentials)
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
    "published": True,
}
r = requests.post(API_URL + "quiz", json=sample_quiz, cookies=credentials)
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
    "published": True,
}
r = requests.post(API_URL + "quiz", json=sample_quiz, cookies=credentials)
print(r.json())

# wish tree quiz
wishtree1_quiz = {
    "name": "Wish Tree Quiz 1",
    "book_id": 2,
    "questions": [
        {
            "text": "In the beginning, the narrator is introduced as?",
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
    "published": True,
}
r = requests.post(API_URL + "quiz", json=wishtree1_quiz, cookies=credentials)
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
            "text": "What did the arborists choose to do with Red?",
            "options": ["Chop it down", "Write wishes on it", "Preserve it"],
            "correct_option": "Chop it down",
        },
    ],
    "published": True,
}
r = requests.post(API_URL + "quiz", json=wishtree2_quiz, cookies=credentials)
print(r.json())

# wish tree quiz
wishtree3_quiz = {
    "name": "Wish Tree Quiz 3",
    "book_id": 2,
    "questions": [
        {
            "text": "In response to the arborists, what does Stephen and his classmates write on Red",
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
            "text": "In the end, who does Samar become good friends with?",
            "options": ["Red", "Francesca", "Bongo", "Stephen"],
            "correct_option": "Stephen",
        },
    ],
    "published": True,
}
r = requests.post(API_URL + "quiz", json=wishtree3_quiz, cookies=credentials)
print(r.json())

# boy called bat quiz
boycalledbat1_quiz = {
    "name": "A Boy Called Bat Quiz 1",
    "book_id": 3,
    "questions": [
        {
            "text": "What grade is Bat in?",
            "options": ["2nd", "4th", "1st", "3rd"],
            "correct_option": "3rd",
        },
        {
            "text": "What is Bat's mother's occupation?",
            "options": ["Veterinarian", "Nurse", "Teacher", "Scientist"],
            "correct_option": "Veterinarian",
        },
        {
            "text": "What is the name of Bat's skunk?",
            "options": ["Winnie", "Thor", "Bongo", "Stripe"],
            "correct_option": "Thor",
        },
    ],
    "published": True,
}
r = requests.post(API_URL + "quiz", json=boycalledbat1_quiz, cookies=credentials)
print(r.json())

# ruby on outside quiz
rubyonoutside1_quiz = {
    "name": "Ruby on the Outside Quiz 1",
    "book_id": 4,
    "questions": [
        {
            "text": "How old is Ruby at the start of the book?",
            "options": ["8", "15", "10", "11"],
            "correct_option": "11",
        },
        {
            "text": "Why can't Ruby see her mother? Where is she?",
            "options": ["Hospital", "DMV", "Prison", "Dev night"],
            "correct_option": "Prison",
        },
        {
            "text": "What is the name of Ruby's new friend?",
            "options": ["Madeline", "Maggie", "Margalit", "Margaret"],
            "correct_option": "Margalit",
        },
    ],
    "published": True,
}
r = requests.post(API_URL + "quiz", json=rubyonoutside1_quiz, cookies=credentials)
print(r.json())

before_reading_advice = """
<strong>Before reading:</strong>
<ol>
<li>Looking at the title, cover and illustrations/pictures, what do you think will happen in this book?</li>
<li>What makes you think that?</li>
<li>What characters do you think might be in the book?</li>
<li>Do you think there will be problem in the story? Why?</li>
<li>What do you already know about the topic of this book?</li>
<li>Does the topic or story relate to you or your family? How?</li>
<li>Do you think it will be like any other book you’ve read? If so, which one, and how do you think it will be similar?</li>
</ol>
"""

parent_advice1 = {"text": before_reading_advice}
r = requests.post(API_URL + "parent_advice", json=parent_advice1, cookies=credentials)
print(r.json())

during_reading_advice = """
<strong>During reading:</strong>
<ol>
<li>What has happened so far in the story? Can you tell me using sequence words? (first, then, next, after, finally, etc.)</li>
<li>What do you predict will happen next?</li>
<li>How do you think the story will end?</li>
<li>Why do you think the character did ____________?</li>
<li>What would you have done if you were the character?</li>
<li>How would you have felt if you were the character?</li>
<li>When you read, what pictures did you see in your head? How did you imagine it looked like?</li>
<li>What are you wondering about as you read? What questions do you have?</li>
<li>Think about the predictions you made before reading; do you still think the story will go that way? Why or why not? How do you think it will go now?</li>
</ol>
"""

parent_advice2 = {"text": during_reading_advice}
r = requests.post(API_URL + "parent_advice", json=parent_advice2, cookies=credentials)
print(r.json())

after_reading_advice = """
<strong>After reading:</strong>
<ol>
<li>Why is the title a good title for the book/story? If you had to give it a different title, what would be another good title for it?</li>
<li>Were your predictions correct? Where did you have to fix your prediction as you read?</li>
<li>If there was a problem, did it get solved? How did the character try to solve the problem?</li>
<li>What happened because of the problem?</li>
<li>Did any of the characters change through the story? Who changed, and how did they change?</li>
<li>Why do you think the author wrote this?</li>
<li>What is the most important point that the author is trying to make in his/her writing?</li>
<li>What was your favorite part? Why?</li>
<li>If you could change one part, what would you change?</li>
<li>If you could ask the author a question, what would you ask?</li>
<li>Can you retell the story in sequence order (use your fingers and sequence words: first, second, then, next, etc.)</li>
<li>Is there a character in the story that reminds you of someone you know? If so, who are they like, and why do you think that?</li>
<li>Does this book remind you of another book you know? Does it remind you of something you’ve experienced in real life?</li>
</ol>
"""

parent_advice3 = {"text": after_reading_advice}
r = requests.post(API_URL + "parent_advice", json=parent_advice3, cookies=credentials)
print(r.json())

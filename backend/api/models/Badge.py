import pdb

# this file and the classes in it do not correspond to a table in the Database

def num_quiz_attempts(user):
    return len(user.attempted_quizzes)

class Badge:
    def __init__(self, id, title, description, congrats_text, graphic):
        self.id = id
        self.title = title
        self.description = description
        self.congrats_text = congrats_text
        self.graphic = graphic

    def can_receive(self, user, quiz_result):
        return False

    def serialize_to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "congrats_text": self.congrats_text,
            "graphic": self.graphic,
        }

class FirstQuizBadge(Badge):
    def __init__(self):
        Badge.__init__(self, 1, "1st Quiz Completed", "This award is given once a user has completed the first quiz.", "Congrats on your first quiz!", "image.png")

    def can_receive(self, user, quiz_result):
        return num_quiz_attempts(user) == 1


class FifthQuizBadge(Badge):
    def __init__(self):
        Badge.__init__(self, 2, "5th Quiz Completed", "This award is given once a user has completed the fifth quiz.", "Congrats on your fifth quiz!", "image.png")

    def can_receive(self, user, quiz_result):
        # this means this will be their fifth quiz!
        return num_quiz_attempts(user) == 5

class PerfectQuizBadge(Badge):
    def __init__(self):
        Badge.__init__(self, 3, "Perfect Quiz", "This award is given once a user has completed a quiz perfectly for the first time!", "Congrats on completing a quiz perfectly!", "image.png")

    def can_receive(self, user, quiz_result):
        return quiz_result["num_correct"] == quiz_result["num_total"]


all_badges = [FirstQuizBadge(), FifthQuizBadge(), PerfectQuizBadge()]

def give_user_badges(user, quiz_result):
    new_badges = []
    for b in all_badges:
        if b.can_receive(user, quiz_result):
            user.badges.append(b.id)
            new_badges.append(b.serialize_to_json())

    return new_badges

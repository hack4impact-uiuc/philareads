import pdb
from api.models import Quiz

# this file and the classes in it do not correspond to a table in the Database


class Badge:
    def __init__(self, id, title, description, congrats_text, graphic, quantity):
        self.id = id
        self.title = title
        self.description = description
        self.congrats_text = congrats_text
        self.graphic = graphic
        self.quantity = quantity

    def can_receive(self, user, quiz_result):
        # progress is a field added by each quiz category
        return user.progress >= self.quantity

    def serialize_to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "congrats_text": self.congrats_text,
            "graphic": self.graphic,
            "year": 2018 # if we get a table in to track current year we need to use that
        }


class BadgeCategory:
    def __init__(self, badges, name):
        self.badges = badges
        self.name = name

    # returns progress on the next badge in this badge category
    def get_progress_on_next_badge(self, earned_badges_set, user, quiz_result):
        for badge in self.badges:
            # found the next badge to earn
            if badge.id not in earned_badges_set:
                return (self.get_progress(user, quiz_result), badge)
        return None

    def get_newly_earned_badges(self, earned_badges_set, user, quiz_result):
        # fill out the progress field in user
        user.progress = self.get_progress(user, quiz_result)
        # track earned badges
        earned_badges = []
        for badge in self.badges:
            if badge.id not in earned_badges_set:
                if badge.can_receive(user, quiz_result):
                    earned_badges.append(badge)
        return earned_badges

    def get_progress(self, user, quiz_result):
        return 0

def num_quiz_attempts(user):
    quiz_set = set()
    for quiz_result in user.attempted_quizzes:
        quiz_set.add(quiz_result.quiz_id)
    return len(quiz_set)

def get_num_perfects(user):
    quiz_set = set()
    num_perfect = 0
    for quiz_result in user.attempted_quizzes:
        if quiz_result.num_correct == quiz_result.num_total:
            quiz_set.add(quiz_result.quiz_id)
    return len(quiz_set) 

def get_num_books(user):
    books = set()
    num_books = 0
    for quiz_result in user.attempted_quizzes:
        # get the corresponding book id
        quiz = Quiz.query.get(quiz_result.quiz_id)
        books.add(quiz.book_id)
    return len(books)

class NthQuizCategory(BadgeCategory):
    def get_progress(self, user, quiz_result):
        return num_quiz_attempts(user)

class PerfectQuizCategory(BadgeCategory):
    def get_progress(self, user, quiz_result):
        return get_num_perfects(user)

class BookCategory(BadgeCategory):
    def get_progress(self, user, quiz_result):
        return get_num_books(user)

def get_quiz_word(quantity):
    if quantity == 1:
        return "Quiz"
    return "Quizzes"

def get_book_word(quantity):
    if quantity == 1:
        return "Book"
    return "Books"

class NthQuizBadge(Badge):
    def __init__(self, quantity, graphic):
        badge_id = int(str(1) + str(quantity))
        Badge.__init__(
            self,
            badge_id,
            f"{quantity} {get_quiz_word(quantity)} Completed!",
            f"This award is given after completing {quantity} {get_quiz_word(quantity).lower()}",
            f"Congratulations on completing {quantity} {get_quiz_word(quantity).lower()}!",
            graphic,
            quantity
        )

class NthPerfectBadge(Badge):
    def __init__(self, quantity, graphic):
        badge_id = int(str(2) + str(quantity))
        Badge.__init__(
            self,
            badge_id,
            f"{quantity} Perfect {get_quiz_word(quantity)} Completed!",
            f"This award is given after completing {quantity} perfect {get_quiz_word(quantity).lower()}",
            f"Congratulations on completing {quantity} perfect {get_quiz_word(quantity).lower()}!",
            graphic,
            quantity
        )

class NthBookBadge(Badge):
    def __init__(self, quantity, graphic):
        badge_id = int(str(3) + str(quantity))
        Badge.__init__(
            self,
            badge_id,
            f"Quizzes from {quantity} {get_book_word(quantity)} Completed!",
            f"This award is given after completing quizzes from {quantity} {get_book_word(quantity).lower()}",
            f"Congratulations on completing quizzes from {quantity} {get_book_word(quantity).lower()}!",
            graphic,
            quantity
        )
    

quiz_badges = [NthQuizBadge(1, "bronze_quiz"), NthQuizBadge(3, "silver_quiz"), NthQuizBadge(5, "gold_quiz"), NthQuizBadge(10, "diamond_quiz")]
perfect_badges = [NthPerfectBadge(1, "bronze_perfect"), NthPerfectBadge(3, "silver_perfect"), NthPerfectBadge(5, "gold_perfect"), NthPerfectBadge(10, "diamond_perfect")]
book_badges = [NthBookBadge(1, "bronze_book"), NthBookBadge(3, "silver_book"), NthBookBadge(5, "gold_book"), NthBookBadge(10, "diamond_book")]

quiz_badge_category = NthQuizCategory(quiz_badges, "completed-quizzes")
perfect_badge_category = PerfectQuizCategory(perfect_badges, "perfect-quizzes")
book_badge_category = BookCategory(book_badges, "completed-books")

all_badge_categories = [quiz_badge_category, perfect_badge_category, book_badge_category]

# construct a map of badge ids to badge objects for quicker access
all_badge_map = {}
for category in all_badge_categories:
    for badge in category.badges:
        all_badge_map[badge.id] = badge

def give_user_badges(user, quiz_result):
    new_badges = []
    earned_badges_set = set(user.badges)
    for category in all_badge_categories:
        new_badges.extend(category.get_newly_earned_badges(earned_badges_set, user, quiz_result))
    for badge in new_badges:
        user.badges.append(badge.id)

    return [badge.serialize_to_json() for badge in new_badges]

def get_user_badges(user):
    return [all_badge_map[badge_id] for badge_id in user.badges]

def get_progress_on_badges(user):
    progress = []
    earned_badges_set = set(user.badges)
    for category in all_badge_categories:
        next_badge_progress_or_none = category.get_progress_on_next_badge(earned_badges_set, user, None)
        if next_badge_progress_or_none is not None:
            next_badge_progress, next_badge = next_badge_progress_or_none
            category_progress = {
                "type": category.name,
                "currentCount": next_badge_progress,
                "targetCount": next_badge.quantity
            }
            category_progress.update(next_badge.serialize_to_json())
            progress.append(category_progress)
    return progress
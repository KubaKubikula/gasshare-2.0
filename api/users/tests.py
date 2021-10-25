from django.test import TestCase
from users.models import User
from passlib.hash import bcrypt_sha256

class UserTestCase(TestCase):
    def setUp(self):
        User.hitchhiker_objects.create(email="jakub.zient@gmmail.com", password=bcrypt_sha256.hash("heslo"))

    def test_animals_can_speak(self):
        user = User.hitchhiker_objects.get_user(email="jakub.zient@gmmail.com", password="heslo")
        self.assertEqual("jakub.zient@gmmail.com", "jakub.zient@gmmail.com")
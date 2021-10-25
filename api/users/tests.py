from django.test import TestCase
from users.models import User
from passlib.hash import bcrypt_sha256

class UserTestCase(TestCase):
    def setUp(self):
        User.hitchhiker_objects.create(email="jakub.zient@gmail.com", password=bcrypt_sha256.hash("heslo"))

    def test_animals_can_speak(self):
        user = User.hitchhiker_objects.get_user(email="jakub.zient@gmail.com", password="heslo")
        self.assertEqual("jakub.zient@gmail.com", "jakub.zient@gmail.com")
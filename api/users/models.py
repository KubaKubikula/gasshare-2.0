from django.db import models
from passlib.hash import bcrypt_sha256

class UserHashPassManager(models.Manager):
    def get_user(self, email, password):
        def hash_pass(password):
            return bcrypt_sha256.hash((password))

        return super().get_queryset().filter(email=email,password=hash_pass(password))

class User(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    email = models.CharField(max_length=100, blank=True, default='', unique=True)
    password = models.CharField(max_length=100, blank=True, default='')
    token = models.CharField(max_length=100, blank=True, default='')

    objects = models.Manager()
    hash_pass_objects = UserHashPassManager()
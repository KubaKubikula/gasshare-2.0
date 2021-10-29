from django.db import models
from users.models import User
from drives.models import Drive

# Create your models here.
class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=500, blank=True, default='')
    time = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(User,related_name='sender', on_delete=models.CASCADE, to_field='id', default= False)
    reciever = models.ForeignKey(User,related_name='reciever', on_delete=models.CASCADE, to_field='id', default= False)
    drive = models.ForeignKey(Drive, on_delete=models.CASCADE, to_field='id', default= False)
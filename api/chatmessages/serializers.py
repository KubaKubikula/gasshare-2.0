from rest_framework import serializers
from chatmessages.models import Message

class MessageSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Message
        db_table = 'message'
        fields = ['id', 'created', 'message', 'time','time', 'sender', 'reciever']
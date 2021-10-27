from rest_framework import serializers
from drives.models import Drive
from users.models import User
import logging
import json

class DriveSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Drive
        db_table = 'drives'
        fields = ['id', 'created', 'drive_from', 'drive_to','time', 'hitchhike', 'user_id']
    
    def save(self):
        logging.warning(json.dumps(self.validated_data))
        drive = Drive(user=User.objects.get(id=1))
        drive.drive_from = self.validated_data["drive_from"]
        drive.drive_to = self.validated_data["drive_to"]
        drive.hitchhike = self.validated_data["hitchhike"]

        drive.save()

        return True
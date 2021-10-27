from rest_framework import serializers
from drives.models import Drive
import logging
class DriveSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Drive
        db_table = 'drives'
        fields = ['id', 'created', 'drive_from', 'drive_to','time', 'hitchhike', 'user_id']
    
    def save(self):
        drive = Drive(self.validated_data)

        logging.warning(self.validated_data)

        return True
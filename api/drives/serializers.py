from rest_framework import serializers
from drives.models import Drive

class DriveSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Drive
        db_table = 'drives'
        fields = ['id', 'created', 'drive_from', 'drive_to','time', 'hitchhike', 'user_id']
        
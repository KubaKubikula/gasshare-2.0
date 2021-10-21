from rest_framework import serializers
from drives.models import Drive

class DriveSerializer(serializers.Serializer): 
    class Meta:
        model = Drive
        fields = ['id', 'created', 'drive_from', 'drive_to','time', 'hitchhike']
        
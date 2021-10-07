from rest_framework import serializers
from drives.models import Drive, LANGUAGE_CHOICES, STYLE_CHOICES

class DriveSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    drive_from = serializers.CharField(required=False, allow_blank=True, max_length=100)
    drive_to = serializers.CharField(required=False, allow_blank=True, max_length=100)
    time = serializers.CharField(required=False, allow_blank=True, max_length=100)

    def create(self, validated_data):
        return Drive.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.drive_from = validated_data.get('drive_from', instance.drive_from)
        instance.drive_to = validated_data.get('drive_to', instance.drive_to)
        instance.time = validated_data.get('time', instance.time)
        instance.save()
        return instance
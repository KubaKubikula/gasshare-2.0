from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={'input_type', 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'password2']

    def save(self):
        user = User(email=self.validated_data['email'])

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match!'})
        user.password = password
        user.save()

        return user

class LoginUserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id', 'email', 'password']

    def valid_login(self):
        return True
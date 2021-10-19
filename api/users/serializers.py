from rest_framework import serializers
from users.models import User
import string
import random

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
        letters = string.ascii_letters
        user.token = '' . join(random.choice(letters) for i in range(100))
        user.save()

        return user

class LoginUserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'token']

    def valid_login(self, email, password):      
        try:
            user = User.objects.get(email=email, password=password )
            return user
        except:
            return False

class UserLoggedInSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'token']

    def valid_token(self, token):      
        try:
            user = User.objects.get(token=token)
            return user
        except:
            return False
        
from rest_framework import serializers
from users.models import User
import string
import random
from passlib.hash import bcrypt_sha256
import logging

class UserSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={'input_type', 'password'}, write_only=True)
    
    class Meta:
        model = User
        db_table = 'users'
        fields = ['id', 'email', 'password','password2','token']

    def save(self):
        user = User(email=self.validated_data['email'])
    
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        logging.warning(password)

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match!'})
        user.password = bcrypt_sha256.hash(password)
        letters = string.ascii_letters
        user.token = '' . join(random.choice(letters) for i in range(100))
        user.save()

        return {"email" : user.email, "token" : user.token }

class LoginUserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'token', 'avatar_url', 'firstname', 'lastname', 'google_id', 'google_token']

    def valid_login(self, email, password):      
        logging.warning(email)
        logging.warning(bcrypt_sha256.hash(password))

        user = User.hash_pass_objects.get(email=email)

        if user:
            if bcrypt_sha256.verify(password, user.password):
                return user
            
        return False
        

class UserLoggedInSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'token']

    def valid_token(self, token):      
        try:
            User.objects.get(token=token)
            return True
        except:
            return False

class GoogleLoginUserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'token', 'avatar_url', 'firstname', 'lastname', 'google_id', 'google_token']

    def save_data(self, data):      
        user = User.hash_pass_objects.get(email=data.email)
        user.avatar_url = data.avatar_url
        user.lastname = data.lastname
        user.firstname = data.firstname
        user.google_id = data.google_id
        user.google_token = data.google_token
        user.save()
            
        return user
        
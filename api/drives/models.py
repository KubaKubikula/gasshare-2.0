from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from users.models import User

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

class HitchhikerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(hitchhike=True)

class DriverManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(hitchhike=False)

class Drive(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    drive_from = models.CharField(max_length=100, blank=True, default='')
    drive_to = models.CharField(max_length=100, blank=True, default='')
    time = models.DateTimeField(auto_now_add=True)
    hitchhike = models.BooleanField(blank=True, default= False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', default= False) 

    objects = models.Manager() # The default manager.
    hitchhiker_objects = HitchhikerManager() # The Dahl-specific manager.
    driver_objects = DriverManager()

    def drive_from_hitchhiker(self):
        if self.hitchhike == True:
            return True
        else:
            return False
            
    @property
    def type_verbose(self):
        if self.hitchhike == True:
            return "Hitchhiker"
        else:
            return "Driver"

    def save(self, *args, **kwargs):
        if self.user == 54:
            return # Yoko shall never have her own blog!
        else:
            super().save(*args, **kwargs) 
        



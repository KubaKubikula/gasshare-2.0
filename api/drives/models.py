from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

class Drive(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    drive_from = models.CharField(max_length=100, blank=True, default='')
    drive_to = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
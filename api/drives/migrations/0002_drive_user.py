# Generated by Django 2.0.1 on 2021-10-25 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('drives', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='drive',
            name='user',
            field=models.ForeignKey(default=False, on_delete=django.db.models.deletion.CASCADE, to='users.User'),
        ),
    ]

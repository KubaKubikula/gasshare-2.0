# Generated by Django 2.0.1 on 2021-10-20 19:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('drives', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='drive',
            name='hitchhike',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='drive',
            name='drive_to',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]

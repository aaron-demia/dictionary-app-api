# Generated by Django 3.2.25 on 2025-06-25 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_alter_word_frequency'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exsentence',
            name='sentence',
            field=models.TextField(db_index=True),
        ),
        migrations.AlterField(
            model_name='word',
            name='title',
            field=models.CharField(db_index=True, max_length=255),
        ),
    ]

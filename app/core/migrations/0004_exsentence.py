# Generated by Django 3.2.25 on 2025-06-21 10:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_rename_name_word_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExSentence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('word', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.word')),
            ],
        ),
    ]

"""
Database models.
"""
from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError("User must have an email address.")
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user



class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = 'email'

class Word(models.Model):
    """Word in the system"""
    title = models.CharField(max_length = 255)
    definition = models.TextField(blank=True)
    frequency = models.IntegerField()

    def __str__(self):
        return self.title
    

class ExSentence(models.Model):
    """Example Sentence in the system"""
    sentence = models.TextField()
    word = models.ForeignKey(
        Word,
        related_name="exSentences", 
        on_delete=models.CASCADE,
    )
    def __str__(self):
        return self.sentence

class UserWord(models.Model):
    word = models.ForeignKey(
        Word,
        related_name="user_words", 
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    
    def __str__(self):
        return self.word.title
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'word'], name='unique_user_word')
        ]



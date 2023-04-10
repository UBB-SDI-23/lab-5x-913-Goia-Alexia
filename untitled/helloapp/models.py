import uuid

from django.contrib.auth.models import User
from django.db import models

'''{
        "name": "PC",
        "activeUsers":2,
        "screen":true,
        "handheld":true,
        "size":3
    }
'''


class Platform(models.Model):
    name = models.CharField(max_length=20, unique=True)
    activeUsers = models.PositiveIntegerField(null=True)
    screen = models.BooleanField(default=True)
    handheld = models.BooleanField(default=True)
    size = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return f"Platform: {self.name}"


class VideoGame(models.Model):
    name = models.CharField(max_length=50, unique=True)
    releaseYear = models.PositiveSmallIntegerField(blank=True, null=True)
    company = models.CharField(max_length=50)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(blank=True, null=True)
    sales = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"Game: {self.name}"


class Player(models.Model):
    username = models.CharField(max_length=10, null=True, unique=True)
    age = models.PositiveSmallIntegerField(default=18)
    email = models.CharField(max_length=30, null=True)
    gender = models.CharField(max_length=2, default="NB")
    favouriteGenre = models.CharField(max_length=10, null=True)

    def __str__(self):
        return f"Player: {self.username}"


class PlayerGame(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.ForeignKey(Player, on_delete=models.CASCADE)
    gamename = models.ForeignKey(VideoGame, on_delete=models.CASCADE)
    hoursPlayed = models.SmallIntegerField(default=0)
    hasSaveFile = models.BooleanField(default=False)

    def __str__(self):
        return f"Game owned by Player data: {self.username} + {self.gamename}"

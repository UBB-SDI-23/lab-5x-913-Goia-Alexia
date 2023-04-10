"""assignment1SDI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from .views import *
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Games API",
      default_version='v1'
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('swag/', schema_view.with_ui('swagger', cache_timeout=0), name='openapi-schema'),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('videogames/', VideoGameListApiView.as_view()),
    path('videogames/<int:videogame_id>/', VideoGameDetailApiView.as_view()),  # asta
    path('videogames/filter/<int:val>', VideoGameFilter.as_view()),
    path('platforms/', PlatformListApiView.as_view()),
    path('platforms/<int:platform_id>/', PlatformDetailApiView.as_view()),
    path('players/', PlayerListApiView.as_view()),
    path('players/<int:player_id>', PlayerDetailApiView.as_view()),
    path('savefiles/', SaveFileListApiView.as_view()),
    path('savefiles/<str:playergame_id>', SaveFileDetailApiView.as_view()),
    path('videogames/by-avg-year', VideoGamesAverageYearStatistic.as_view(), name='by-avg-year'),
    path('players/by-avg-age', PlayersAverageAgeStatistic.as_view(), name='by-avg-age'),
    path('multipleplatformsbulkadd', MultiplePlatformsView.bulkAdd)
]

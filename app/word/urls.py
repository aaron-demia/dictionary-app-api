from django.urls import (
    path,
    include,
)

from rest_framework.routers import DefaultRouter

from word import views 

router = DefaultRouter()
router.register('words', views.WordViewSet)
router.register('userWords', views.UserWordViewSet)

app_name = 'word'

urlpatterns = [
    path('', include(router.urls))
]
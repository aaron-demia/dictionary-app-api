from django.shortcuts import render
from rest_framework import viewsets, mixins, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated 
from core.models import Word, ExSentence, UserWord
from word import serializers
# Create your views here.

class WordViewSet(viewsets.ModelViewSet):
    """View for managing word APIs."""
    serializer_class = serializers.WordSerializer
    queryset = Word.objects.all()
    search_fields = ['title', 'definition']
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter] 
    def get_queryset(self):
        return self.queryset
    

class ExSentenceViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,   # <-- Corrected
    mixins.DestroyModelMixin,  # <-- Corrected
    viewsets.GenericViewSet
):
    """Manage Example Sentences in the database"""
    serializer_class = serializers.ExSentenceSerializer
    queryset = ExSentence.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class UserWordViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserWordSerializer
    queryset = UserWord.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        return UserWord.objects.filter(user=self.request.user)
    
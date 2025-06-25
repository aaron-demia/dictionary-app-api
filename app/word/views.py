from django.shortcuts import render
from django.db.models import Q, Count
from rest_framework import viewsets, mixins, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated 
from core.models import Word, ExSentence, UserWord
from word import serializers
# Create your views here.

class WordViewSet(viewsets.ModelViewSet):
    """View for managing word APIs."""
    serializer_class = serializers.WordSerializer
    queryset = Word.objects.annotate(example_count=Count('exSentences'))
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
  
    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(definition__icontains=search) |25 
                Q(exSentences__sentence__icontains=search)
            ).distinct()
        return queryset
    

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
    
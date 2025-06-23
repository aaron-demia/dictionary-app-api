from rest_framework import serializers
from core.models import Word, ExSentence, UserWord


class ExSentenceSerializer(serializers.ModelSerializer):
    """Serializer for example sentences"""
    class Meta:
        model = ExSentence
        fields = ['id', 'sentence']
        read_only_fields = ['id']

class WordSerializer(serializers.ModelSerializer):
    """Serializer for recipies"""
    exSentences = ExSentenceSerializer(many=True, required=False)
    class Meta:
        model = Word
        fields = ['id', 'title', 'definition', 'frequency', 'exSentences']
        read_only_fields = ['id']

class UserWordSerializer(serializers.ModelSerializer):
    """Serializer for User's Words"""
    word_detail = WordSerializer(source='word', read_only=True)
    class Meta:
        model = UserWord
        fields = ['id', 'word', 'word_detail']
        read_only_fields = ['id', 'word_detail']



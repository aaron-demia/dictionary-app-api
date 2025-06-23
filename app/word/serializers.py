from rest_framework import serializers
from core.models import Word, ExSentence


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




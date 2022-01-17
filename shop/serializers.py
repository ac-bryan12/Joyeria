from dataclasses import field
from rest_framework import serializers
class CartSerializer(serializers.Serializer):
    id = serializers.IntegerField(write_only=True)
    amount = serializers.IntegerField(write_only=True)
    
    class META:
        fields = ["id","amount"]
    
    
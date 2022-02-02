from rest_framework import serializers


class DateSerializer(serializers.Serializer):
    fechaInicio = serializers.DateField()
    fechaFin = serializers.DateField()


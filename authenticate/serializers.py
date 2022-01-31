from collections import OrderedDict
from copy import error
from rest_framework.serializers import ValidationError
from rest_framework import serializers
from django.contrib.auth.models import Group, User
import re

from authenticate.models import Profile

class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(min_length=2,max_length=150)
    last_name = serializers.CharField(max_length=150)
    password = serializers.CharField(required=False,max_length=30,write_only=True)
    email = serializers.EmailField(max_length=254)
    # profile = serializers.SlugRelatedField(read_only=True,slug_field="telefono")
    
    
    class Meta:
        model = User
        fields = ['id','first_name','last_name','password','email']
    
    def create(self, validated_data): 
        user = User()
        profile = Profile()
        group = Group.objects.get(name="cliente")
        
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.set_password(validated_data['password'])
        user.email = validated_data['email']
        user.username = validated_data['email']
        user.save()
        
        user.groups.add(group)
        user.save()
        
        profile.user = user
        profile.telefono = validated_data['telefono']
        profile.direccion = validated_data['direccion']
        profile.save()
        
        return user
    
    def update(self, instance, validated_data):
        instance.first_name = validated_data["first_name"]
        instance.last_name = validated_data["last_name"]
        instance.email = validated_data["email"]
        instance.username = validated_data["email"]
        instance.save()
        
        instance.profile.direccion = validated_data["direccion"]
        instance.profile.telefono = validated_data["telefono"]
        
        instance.profile.save()
        return instance
    
    
    def validate(self, attrs):
        validated_data = OrderedDict()
        errors = OrderedDict()

        try:
            validated_data = super().validate(attrs)
        except ValidationError as exc:
            errors = exc.detail
        
        if re.fullmatch("^[0-9]+$",attrs['telefono']) and len(attrs['telefono']) == 10:
            validated_data['telefono'] = attrs['telefono']
        else:
            errors["telefono"] = ["No coincide el formato para telefono: '^[0-9]+$' o no contiene los 10 digitos."]

        if len(attrs['direccion']) > 2 and len(attrs['direccion']) < 255:
            validated_data["direccion"] = attrs['direccion']
        else:
            errors["direccion"] = ["La longitud es mayor a 254 caracteres"]
            
        if not self.instance:
            if not attrs.get("password"):
                errors["password"] = ["No ha proporcionado una contraseña"]
                
            if User.objects.filter(email=attrs["email"]).exists():
                errors["email"] = ["El correo ingresado ya existe en el sistema"]
            
            if Profile.objects.filter(telefono=attrs["telefono"]).exists():
                errors["telefono"] = ["El telefono ingresado ya existe en el sistema"]
        
        if errors:
            raise ValidationError(errors)
        
        return validated_data
    
    
    def to_internal_value(self, data):
        errors = OrderedDict()
        user = OrderedDict()
        try:
            user = super().to_internal_value(data)
        except ValidationError as exc:
            errors = exc.detail
            
        if data.get('direccion'):
            user['direccion'] = data.get('direccion')
        else:
            errors["direccion"] = ['This field is required.']
        
        if data.get('telefono'):
            user['telefono'] = data.get('telefono')
        else:
            errors["telefono"] = ['This field is required.']
        
        if errors:
            raise ValidationError(errors)
        
        return user
    
    
    def to_representation(self, instance):
        user = {
            "first_name": instance.first_name,
            "last_name": instance.last_name,
            "email": instance.email,
            "direccion": instance.profile.direccion,
            "telefono": instance.profile.telefono
        }
        return user



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=254)
    password = serializers.CharField(max_length=30,write_only=True)
    
    class Meta:
        fields = ['email','password']
        
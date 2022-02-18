from collections import OrderedDict
from django.forms import ValidationError
from producto.models import Articulo
from rest_framework import serializers

from shop.models import Pedido


class CartSerializer(serializers.Serializer):
    id = serializers.IntegerField(write_only=True)
    amount = serializers.IntegerField(write_only=True)
    
    class Meta:
        fields = ["id","amount"]
        
    def validate(self, attrs):
        errors = OrderedDict()
        if not Articulo.objects.filter(pk=attrs["id"]).exists():
            errors["id"] = ["No existe un articulo con el id "+ str(attrs["id"])]
        
        elif not self.instance:
            if attrs["amount"] > Articulo.objects.get(pk=attrs["id"]).stock :
                errors["amount"] = ["Está superando el stock del producto con id "+str(attrs["id"])]
        
        if errors:
            raise ValidationError(errors)
        
        return attrs
    
class PedidoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pedido
        fields = ["id","fechaCompra","total"]
    
    
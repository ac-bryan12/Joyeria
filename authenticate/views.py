from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.response import Response
from authenticate.serializers import LoginSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status,permissions
from rest_framework.authentication import TokenAuthentication

class Login(APIView):
    
    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = authenticate(username=serializer.validated_data["email"],password=serializer.validated_data["password"])
            
            if user is None:
                return Response({"error":"Email o contraseña incorrecta"},status=status.HTTP_400_BAD_REQUEST)
            else:
                token,created = Token.objects.get_or_create(user=user)
                if not created:
                    token.delete()
                    token = Token.objects.create(user=user)
                
                return Response({"token":token.key})
        
        return Response({"error":"Email o contraseña incorrecta"},status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self,request):
        request.user.auth_token.delete()
        data = {"estado": "SESION_TERMINADA"}
        return Response(data, status=status.HTTP_200_OK)


class User(APIView):
    
    def get(self,request):
        serializer = UserSerializer(User.objects.all(),many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({"msg":"Usuario creado con éxito"})


class UserCredentials(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request):
        group =  request.user.groups.all()
        token = Token.objects.get(user=request.user)
        return Response({"group":group[0],"token":token.key})    
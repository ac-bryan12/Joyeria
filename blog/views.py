from collections import OrderedDict
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from blog.serializers import BlogSerializer
from blog.models import Blog

class BlogView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.AllowAny]
    
    def get(self,request,id):
        publicacion = Blog.objects.filter(pk=id)
        if publicacion.exists():
            publicacion = publicacion.get()
            serializer = BlogSerializer(publicacion)
            data = OrderedDict(serializer.data)
            data["contenido"] = publicacion.contenido.decode()
            return Response(data)
        return Response({"error":"Publicación no encontrada"},status=status.HTTP_404_NOT_FOUND)
    
    def post(self,request):
        if request.user.is_authenticated:
            serializer = BlogSerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({"msg":"Se ha creado una nueva publicación"})
        return Response({"error":"No autorizado"},status=status.HTTP_403_FORBIDDEN)
    
    def put(self,request,id):
        if request.user.is_authenticated:
            post = Blog.objects.filter(pk=id)
            if post.exists():
                post = post.get()
                serializer = BlogSerializer(post,data = request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response({"msg":"Se ha modificado la publicación"})
                
            return Response({"error":"Publicación no encontrada"},status=status.HTTP_404_NOT_FOUND)
        return Response({"error":"No autorizado"},status=status.HTTP_403_FORBIDDEN)
        

    def delete(self,request,id):
        if request.user.is_authenticated:    
            post = Blog.objects.filter(pk=id)
            if post.exists():
                post = post.get()
                post.delete()                
                return Response({"msg":"Se ha eliminado la publicación"})
            return Response({"error":"Publicación no encontrada"},status=status.HTTP_404_NOT_FOUND)
        return Response({"error":"No autorizado"},status=status.HTTP_403_FORBIDDEN)



class BlogListView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.AllowAny]
    def get(self,request):
        
        publicaciones = Blog.objects.all()
        data = []

        for publicacion in publicaciones:
            post = OrderedDict(BlogSerializer(publicacion).data)
            post["contenido"] = publicacion.contenido.decode()
            data.append(post)
            
        return Response(data)
            
        
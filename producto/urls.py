from django.urls import path

from .views import Articulos,Categorias

urlpatterns = [
    path('articulos', Articulos.as_view()),
    path('articulos/<int:id>', Articulos.as_view()),
    path('articulos/categorias',Categorias.as_view())
]
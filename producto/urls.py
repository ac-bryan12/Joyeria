from django.urls import path

from .views import Articulos

urlpatterns = [
    path('articulos', Articulos.as_view())
]
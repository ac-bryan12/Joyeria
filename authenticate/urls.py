from django.contrib.auth.models import User
from django.urls import path
from authenticate.views import Login, Logout, User,UserCredentials

urlpatterns = [
    path('login/',Login.as_view()),
    path('logout/',Logout.as_view()),
    path('signup/',User.as_view()),
    path('user_credentials/',UserCredentials.as_view())
]
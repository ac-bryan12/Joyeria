from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import parsers
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from joyeria.settings import EMAIL_HOST_USER
from rest_framework import parsers, renderers

class RegisterView(APIView):
    # throttle_classes = ()
    permission_classes = [permissions.AllowAny]
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    # @csrf_exempt
    def send_mail(mail,context,subject,Template):
        template  = get_template(Template)
        content = template.render(context)
        email = EmailMultiAlternatives(
            subject,
            'By Coco Shop',
            EMAIL_HOST_USER,
            [mail], 
        )
        email.attach_alternative(content,'text/html')
        print("Correo enviado ")
        print(mail)
        email.send()
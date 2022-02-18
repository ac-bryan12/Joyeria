# Generated by Django 3.2 on 2022-01-31 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=300, null=True)),
                ('descripcion', models.CharField(max_length=300, null=True)),
                ('autor', models.CharField(max_length=300, null=True)),
                ('img_portada', models.URLField(max_length=1024, null=True)),
                ('contenido', models.BinaryField(null=True)),
            ],
        ),
    ]

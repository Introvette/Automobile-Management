# Generated by Django 4.0.3 on 2022-10-26 01:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='import_href',
        ),
    ]
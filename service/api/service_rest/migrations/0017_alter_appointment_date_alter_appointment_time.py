# Generated by Django 4.0.3 on 2022-10-27 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0016_alter_appointment_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='time',
            field=models.TimeField(),
        ),
    ]

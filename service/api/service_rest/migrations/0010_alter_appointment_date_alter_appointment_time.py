# Generated by Django 4.0.3 on 2022-10-26 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0009_rename_vin_appointment_automobile'),
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

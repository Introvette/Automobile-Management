# Generated by Django 4.0.3 on 2022-10-26 01:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_remove_automobilevo_import_href'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='name',
            new_name='customer',
        ),
    ]
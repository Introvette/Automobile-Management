from django.contrib import admin
from django.contrib import admin
from .models import Appointment, AutomobileVO, Technician


admin.site.register(AutomobileVO)
admin.site.register(Appointment)
admin.site.register(Technician)

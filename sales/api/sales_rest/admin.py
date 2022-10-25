from django.contrib import admin
from .models import Customer, AutomobileVO, Salesperson, Autosale
# Register your models here.

admin.site.register(Customer)
admin.site.register(AutomobileVO)
admin.site.register(Salesperson)
admin.site.register(Autosale)


class SalespersonAdmin(admin.ModelAdmin):
    pass

class CustomerAdmin(admin.ModelAdmin):
    pass

class AutomobileVOAdmin(admin.ModelAdmin):
    pass

class AutosaleAdmin(admin.ModelAdmin):
    pass

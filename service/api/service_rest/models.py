from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True, null=True)



class Technician(models.Model):
    name = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)
    def get_api_url(self):
        return reverse("show_technician", kwargs={"pk": self.id})
    def __str__(self):
        return self.name

class Appointment(models.Model):
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT
    )
    owner = models.CharField(max_length=50)
    date = models.CharField(max_length=200, null=False)
    time = models.CharField(max_length=200, null=False)
    vin = models.CharField(max_length=17)
    reason = models.TextField(max_length=100)
    finished = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    def get_api_url(self):
        return reverse("show_appointment", kwargs={"pk": self.id})
    def __str__(self):
        return f"Appointment for {self.owner}, VIP {self.vip}"

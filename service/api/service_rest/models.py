from django.db import models
from django.urls import reverse
from django.utils import timezone

class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

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
        related_name="service",
        on_delete=models.PROTECT
    )
    owner = models.CharField(max_length=50)
    scheduled_time = models.DateTimeField(default=timezone.now)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="service",
        on_delete=models.PROTECT
    )
    reason = models.TextField(max_length=100)
    finished = models.BooleanField()
    canceled = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    def get_api_url(self):
        return reverse("show_appointment", kwargs={"pk": self.id})
    def __str__(self):
        return f"Appointment for {self.owner}, VIP {self.vip}"

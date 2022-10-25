from django.urls import path
from .views import list_appointment, list_technician, show_appointment, show_technician, list_service_history

urlpatterns = [
    path("appointment/", list_appointment, name="list_appointment"),
    path("appointment/<int:pk>/", show_appointment, name="show_appointment"),
    path("technician/", list_technician, name="list_technician"),
    path("technician/<int:pk>/", show_technician, name="show_technician"),
    path("vin/appointment/<str:vin>/", list_service_history, name="list_service_history"),
]

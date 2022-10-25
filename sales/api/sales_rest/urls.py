from django.urls import path
from .views import (
    delete_autosale, list_customers, list_salespeople,
    show_salesperson, list_autosales
    )

urlpatterns = [
    path("customers/", list_customers, name="list_customers"),
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("salespeople/<int:pk>/", show_salesperson, name="show_salesperson"),
    path("autosales/", list_autosales, name="list_autosales"),
    path("autosales/<int:pk>/", delete_autosale, name="delete_autosale"),
]

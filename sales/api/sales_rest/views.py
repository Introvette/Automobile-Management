from django.shortcuts import render

# Create your views here.

from .models import Autosale, AutomobileVO, Customer, Salesperson
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from django.db import IntegrityError

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = ["id", "sales_person", "employee_number"]

class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = ["id", "sales_person", "employee_number"]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "customer", "address", "phone"]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "customer", "address", "phone"]

class AutosaleListEncoder(ModelEncoder):
    model = Autosale
    properties = [
        "id",
        "price",
        "automobile",
        "sales_rep",
        "customer"
        ]

    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_rep": SalespersonListEncoder(),
        "customer": CustomerListEncoder(),
    }

class AutosaleDetailEncoder(ModelEncoder):
    model = Autosale
    properties = [
        "id",
        "price",
        "automobile",
        "sales_rep",
        "customer"
        ]

    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_rep": SalespersonListEncoder(),
        "customer": CustomerListEncoder(),
    }

@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all().order_by("employee_number")
        return JsonResponse(
            {"salespeople": salespeople},
            encoder = SalespersonListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder = SalespersonDetailEncoder,
                safe=False,
            )
        except IntegrityError:
            return JsonResponse(
                {"message": "Employee number already exists"},
                status=400,
            )

@require_http_methods(["GET"])
def show_salesperson(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder = CustomerListEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder = CustomerDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_autosales(request):
    if request.method == "GET":
        autosales = Autosale.objects.all()
        return JsonResponse(
            {"autosales": autosales},
            encoder = AutosaleListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=400,
            )
        try:
            salesperson = content["sales_rep"]
            content["sales_rep"] = Salesperson.objects.get(sales_person=salesperson)

        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson name"},
                status = 400,
            )
        try:
            customer = Customer.objects.get(customer=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer name"}
            )

        autosale = Autosale.objects.create(**content)

        return JsonResponse(
            autosale,
            encoder = AutosaleDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def delete_autosale(request, pk):

    count, _ = Autosale.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})

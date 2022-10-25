from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Appointment, Technician
from common.json import ModelEncoder



# encoders
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vip",
        "canceled",
        "finished",
        "id",
        "technician",
        "owner",
        "scheduled_time",
        "automobile",
        "reason"

    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "technician": TechnicianEncoder(),
    }

# Create your views here.
@require_http_methods(["GET", "POST"])
def list_appointment(request):
    if request.method == "GET":
        appointment = Appointment.objects.all()
        print(appointment)
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin_key = content["automobile"]
            vin_value = AutomobileVO.objects.get(vin=vin_key)
            print("vin value", vin_value)
            content["automobile"] = vin_value
            technician_key = content["technician"]
            technician_value = Technician.objects.get(id=technician_key)
            content["technician"] = technician_value
            appointment = Appointment.objects.create(**content)

            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin id"},
                status=400,
            )



@require_http_methods(["DELETE", "GET", "PUT"])
def show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=pk)

            props = ["owner", "date", "finished", "canceled", "vip"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def list_technician(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=pk)

            props = ["name", "id"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET"])
def list_service_history(request, vin):
    if request.method == "GET":
        try:
            service = Appointment.objects.filter(automobile__vin=vin)
            #service = Appointment.objects.all()
            return JsonResponse(
                service,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Appointment"},
                status=400,
            )

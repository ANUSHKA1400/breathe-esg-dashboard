from django.urls import path
from .views import get_records, upload_file, update_status

urlpatterns = [
    path("records/", get_records),
    path("upload/", upload_file),
    path("update/<int:pk>/", update_status),
]
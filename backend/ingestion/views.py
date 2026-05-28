import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes


from .models import UploadRecord
from .serializers import UploadRecordSerializer


@api_view(['GET'])
def get_records(request):
    records = UploadRecord.objects.all().order_by('-uploaded_at')
    serializer = UploadRecordSerializer(records, many=True)
    return Response(serializer.data)
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):

    file = request.FILES.get('file')

    if not file:
        return Response(
            {"error": "No file uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:

        if file.name.endswith('.csv'):
            df = pd.read_csv(file)

        else:
            df = pd.read_excel(file)

        for _, row in df.iterrows():

            UploadRecord.objects.create(
                company_name=row['company_name'],
                metric=row['metric'],
                value=row['value']
            )

        return Response({
            "message": "File uploaded successfully"
        })

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PATCH'])
def update_status(request, pk):

    try:
        record = UploadRecord.objects.get(id=pk)

    except UploadRecord.DoesNotExist:
        return Response(
            {"error": "Record not found"},
            status=404
        )

    new_status = request.data.get('status')

    if new_status not in ['approved', 'rejected']:
        return Response(
            {"error": "Invalid status"}
        )

    record.status = new_status
    record.save()

    serializer = UploadRecordSerializer(record)

    return Response(serializer.data)
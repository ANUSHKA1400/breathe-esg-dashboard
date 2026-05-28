from django.db import models

class UploadRecord(models.Model):
    company_name = models.CharField(max_length=255)
    metric = models.CharField(max_length=255)
    value = models.FloatField()

    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('approved', 'Approved'),
            ('rejected', 'Rejected')
        ],
        default='pending'
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} - {self.metric}"
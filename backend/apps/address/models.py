from django.db import models


class AddressModel(models.Model):
    class Meta:
        db_table = 'address'

    location = models.CharField(max_length=100)

# Generated by Django 4.2.7 on 2023-12-07 13:12

import request.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("request", "0006_request_metapaths"),
    ]

    operations = [
        migrations.AddField(
            model_name="request",
            name="approval",
            field=models.JSONField(default=request.models.approval_default),
        ),
    ]
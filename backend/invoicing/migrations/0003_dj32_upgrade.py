# Generated by Django 3.2.15 on 2022-10-27 12:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("library_sample_shared", "0007_dj32_upgrade"),
        ("flowcell", "0003_dj32_upgrade"),
        ("invoicing", "0002_auto_20181121_1255"),
    ]

    operations = [
        migrations.AlterField(
            model_name="fixedcosts",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="fixedcosts",
            name="sequencer",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="flowcell.sequencer",
            ),
        ),
        migrations.AlterField(
            model_name="invoicingreport",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="librarypreparationcosts",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="librarypreparationcosts",
            name="library_protocol",
            field=models.ForeignKey(
                limit_choices_to={"obsolete": 1},
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="library_sample_shared.libraryprotocol",
                unique=True,
            ),
        ),
        migrations.AlterField(
            model_name="sequencingcosts",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="sequencingcosts",
            name="read_length",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="library_sample_shared.readlength",
                verbose_name="Read Length",
            ),
        ),
        migrations.AlterField(
            model_name="sequencingcosts",
            name="sequencer",
            field=models.ForeignKey(
                limit_choices_to={"obsolete": 1},
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="flowcell.sequencer",
            ),
        ),
    ]

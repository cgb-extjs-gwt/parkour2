# Generated by Django 1.10.6 on 2017-11-21 10:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("sample", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="LibraryPreparation",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "starting_amount",
                    models.FloatField(
                        blank=True, null=True, verbose_name="Starting Amount"
                    ),
                ),
                (
                    "spike_in_description",
                    models.TextField(
                        blank=True, null=True, verbose_name="Spike-in Description"
                    ),
                ),
                (
                    "spike_in_volume",
                    models.FloatField(
                        blank=True, null=True, verbose_name="Spike-in Volume"
                    ),
                ),
                (
                    "pcr_cycles",
                    models.IntegerField(
                        blank=True, null=True, verbose_name="PCR Cycles"
                    ),
                ),
                (
                    "concentration_library",
                    models.FloatField(
                        blank=True, null=True, verbose_name="Concentration Library"
                    ),
                ),
                (
                    "mean_fragment_size",
                    models.IntegerField(
                        blank=True, null=True, verbose_name="Mean Fragment Size"
                    ),
                ),
                ("nM", models.FloatField(blank=True, null=True, verbose_name="nM")),
                (
                    "sample",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="sample.Sample",
                        verbose_name="Sample",
                    ),
                ),
                (
                    "create_time",
                    models.DateTimeField(auto_now_add=True, verbose_name="Create Time"),
                ),
                (
                    "update_time",
                    models.DateTimeField(auto_now=True, verbose_name="Update Time"),
                ),
                (
                    "comments",
                    models.TextField(blank=True, null=True, verbose_name="Comments"),
                ),
                (
                    "qpcr_result",
                    models.FloatField(
                        blank=True, null=True, verbose_name="qPCR Result"
                    ),
                ),
            ],
            options={
                "verbose_name": "Library Preparation",
                "verbose_name_plural": "Library Preparation",
            },
        ),
    ]

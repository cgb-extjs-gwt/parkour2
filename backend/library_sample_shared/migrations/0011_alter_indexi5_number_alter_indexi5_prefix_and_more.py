# Generated by Django 4.2.9 on 2024-02-29 14:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("library_sample_shared", "0010_alter_libraryprotocol_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="indexi5",
            name="number",
            field=models.CharField(default="", max_length=15, verbose_name="Number"),
        ),
        migrations.AlterField(
            model_name="indexi5",
            name="prefix",
            field=models.CharField(default="", max_length=20, verbose_name="Prefix"),
        ),
        migrations.AlterField(
            model_name="indexi7",
            name="number",
            field=models.CharField(default="", max_length=15, verbose_name="Number"),
        ),
        migrations.AlterField(
            model_name="indexi7",
            name="prefix",
            field=models.CharField(default="", max_length=20, verbose_name="Prefix"),
        ),
    ]
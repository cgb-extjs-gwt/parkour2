import logging

from common.utils import retrieve_group_items
from django.apps import apps
from django.db.models import Prefetch
from library_sample_shared.views import LibrarySampleBaseViewSet
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import (
    LibrarySerializer,
    RequestChildrenNodesSerializer,
    RequestParentNodeSerializer,
)

Request = apps.get_model("request", "Request")
Library = apps.get_model("library", "Library")
Sample = apps.get_model("sample", "Sample")

logger = logging.getLogger("db")


class LibrarySampleTree(viewsets.ViewSet):
    def get_queryset(self, showAll=True):
        libraries_qs = Library.objects.all().only("sequencing_depth")
        samples_qs = Sample.objects.all().only("sequencing_depth")

        queryset = (
            Request.objects.filter(archived=False)
            .prefetch_related(
                Prefetch("libraries", queryset=libraries_qs),
                Prefetch("samples", queryset=samples_qs),
            )
            .only("name")
            .order_by("-create_time")
        )
        if not showAll:
            queryset = queryset.filter(sequenced=False)
        if not self.request.user.is_staff:
            if not self.request.user.is_pi:
                queryset = queryset.filter(user=self.request.user)
            else:
                queryset = retrieve_group_items(self.request, queryset)

        return queryset

    def list(self, request):
        """Get the list of libraries and samples."""
        showAll = False
        if request.GET.get("showAll") == "True":
            showAll = True
        queryset = self.get_queryset(showAll)

        request_id = self.request.query_params.get("node", None)

        if request_id and request_id != "root":
            libraries_qs = Library.objects.all().select_related(
                "library_protocol",
                "library_type",
                "read_length",
                "index_type",
                "organism",
            )
            samples_qs = Sample.objects.all().select_related(
                "nucleic_acid_type",
                "library_protocol",
                "library_type",
                "read_length",
                "organism",
            )

            queryset = (
                Request.objects.filter(archived=False, pk=request_id)
                .prefetch_related(
                    Prefetch("libraries", queryset=libraries_qs),
                    Prefetch("samples", queryset=samples_qs),
                )
                .only("name")
            )

            if not self.request.user.is_staff:
                if not self.request.user.is_pi:
                    queryset = queryset.filter(user=self.request.user)
                else:
                    queryset = retrieve_group_items(self.request, queryset)

            queryset = queryset.first()
            serializer = RequestChildrenNodesSerializer(queryset)

            try:
                return Response(
                    {
                        "success": True,
                        "children": serializer.data["children"],
                    }
                )
            except KeyError:
                return Response(
                    {
                        "success": False,
                        "children": [],
                    },
                    400,
                )

        serializer = RequestParentNodeSerializer(queryset, many=True)
        return Response({"success": True, "children": serializer.data})


class LibraryViewSet(LibrarySampleBaseViewSet):
    serializer_class = LibrarySerializer
from django.urls import path

from .views import AddressListCreateView, AddressDestroyView, PlanAddressesView

urlpatterns = [
    path('', AddressListCreateView.as_view()),
    path('<int:pk>', AddressDestroyView.as_view()),
    path('plan', PlanAddressesView.as_view())
]

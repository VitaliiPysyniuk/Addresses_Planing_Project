from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import AddressSerializer
from .models import AddressModel
from .services import MapsAPIUse, Solver


class AddressListCreateView(ListCreateAPIView):
    queryset = AddressModel.objects.all()
    serializer_class = AddressSerializer


class AddressDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = AddressModel.objects.all()
    serializer_class = AddressSerializer


class PlanAddressesView(GenericAPIView):
    def get(self, *args, **kwargs):

        addresses = AddressModel.objects.all()
        addresses = [AddressSerializer(instance=address).data.get('location') for address in addresses]
        addresses = ['Шараневича 28, Львів'] + addresses

        if len(addresses) == 1:
            addresses = addresses + ['Шараневича 28, Львів']
            # result = {'route_points': addresses}
            result = [{'location': address} for address in addresses]
            return Response(result, status.HTTP_200_OK)

        params = {
            'addresses': '|'.join(addresses),
            'mode': 'driving'
        }

        maps_api_result = MapsAPIUse.get_value_matrix_between_addresses(**params)
        duration_matrix = maps_api_result['duration_matrix']

        solver = Solver(duration_matrix)
        solver_result = solver.branch_and_bound_method()

        tour = solver_result['tour']
        route = list()
        route_points = list()
        previous_place = 0
        i = 0

        while tour:
            if tour[i]['from'] == previous_place:
                route.append({'from': addresses[tour[i]['from']], 'to': addresses[tour[i]['to']]})
                route_points.append(addresses[tour[i]['from']])
                previous_place = tour[i]['to']
                tour.pop(i)
                i = 0
                continue
            i += 1

        route_points.append(route[-1]['to'])

        # result = {'route_points': route_points}
        result = [{'location': point} for point in route_points]
        return Response(result, status.HTTP_200_OK)

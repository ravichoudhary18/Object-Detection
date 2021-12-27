from django.http.response import JsonResponse
from .models import DataModel
import pandas as pd


def export_to_csv(request,start,end):
    user_obj = DataModel.objects.filter(
        timestamp__gte=start, timestamp__lte=end)
    response = JsonResponse(data=request.data, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename = report.csv'
    data_list = []
    for user_objs in user_obj:
        data = [user_objs.objects_detected]
        data_list += data
    print(data_list)
    
    a = ' '.join([str(i) for i in data_list])
    b = str(a).replace(" ", ",")
    c = str(b).split(',')

    dict = {}

    for data in c:
        dict[data] = c.count(data)

    key = list(dict.keys())
    value = list(dict.values())

    data = {
        "threat": key,
        "occurance": value
    }

    df = pd.DataFrame(data)
    df.to_csv(path_or_buf=response, sep=',',
            float_format='%.2f', index=False, decimal=",")
    return response
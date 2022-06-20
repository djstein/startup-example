from graphql_relay import from_global_id


def convert_object_relay_ids_to_db_ids(kwargs: dict) -> dict:
    converted_kwargs = {}
    for key, value in kwargs.items():
        if "id" in key:
            value = from_global_id(value)[1]
        converted_kwargs.update({key: value})
    return converted_kwargs


def update_or_create(Model, kwargs: dict):
    converted_kwargs = convert_object_relay_ids_to_db_ids(kwargs)
    obj, _created = Model.objects.update_or_create(
        id=converted_kwargs.get("id"), defaults={**converted_kwargs}
    )
    return obj


def delete(Model, kwargs: dict):
    return Model.objects.get(id=convert_object_relay_ids_to_db_ids(kwargs).get("id"))
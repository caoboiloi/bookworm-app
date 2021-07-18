import qs from 'query-string';


export function handleQuerySearch(query) {
    const queryParam = qs.parse(location.search);
    const newQueryParam = {
       ...queryParam,
       ...query
    }
    return newQueryParam;
}

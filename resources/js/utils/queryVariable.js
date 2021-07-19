import qs from 'query-string';


export function getQueryVariable(props) {
    let params = qs.parse(props.location.search);
    return params;
}

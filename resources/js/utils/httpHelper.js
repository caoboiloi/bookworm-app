import axios from 'axios';
import { MIX_APP_FRONT_URL } from './config';

const endpoint = MIX_APP_FRONT_URL;

// Show filter is required - only get 1 filter left: sort & filter & star & category & author

// show & sort: limit 12, sort by sale, final_price asc
export function getSaleLimit() {
    return axios.get(endpoint + '/api/books/filter?show=12&sort=sale');
}

// show & star & sort: limit 8, sort by avg_star desc, final_price asc
export function getRecommendLimit() {
    return axios.get(endpoint + '/api/books/filter?show=8&sort=recommend');
}

// show & sort: limit 8, sort by popular desc, final_price asc
export function getPopularLimit() {
    return axios.get(endpoint + '/api/books/filter?show=8&sort=popular');
}


export function getBookFilter(query) {
    return axios.get(endpoint + '/api/books/filter?' + query);
}

export function getSidebarFilter() {
    return axios.get(endpoint + '/api/filters');
}

export function getDetailBookById(id) {
    return axios.get(endpoint + '/api/books/' + id);
}

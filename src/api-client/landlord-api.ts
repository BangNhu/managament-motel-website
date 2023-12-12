import axiosClient from './axios-client';
import { AxiosResponse } from 'axios';

interface Landlord {
    id: number;
    landlord_name: string;
    password: string;
    number_phone: string;
    email: string;
    birthday: string;
    gender: number;
    account_type: number;
    expiration_date: string;
}
export const landlordApi = {
    getLandLords(params: any): Promise<AxiosResponse<Landlord[]>> {
        return axiosClient.get('/landlord/list', {
            params,
        });
    },
    getPostsDetail(slug: string, params: any): Promise<AxiosResponse<Landlord[]>> {
        return axiosClient.get('/post-teches/findBySlug/' + slug, {
            params,
        });
    },
    getTagPopular(params: any): Promise<AxiosResponse<Landlord[]>> {
        return axiosClient.get('/findAllTagPopular', {
            params,
        });
    },
};

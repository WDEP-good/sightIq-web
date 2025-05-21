import req from '@/utils/request';

enum API{
    NATIONALDATA = "/national"
}




export const getNationalData = () =>req.get(API.NATIONALDATA,{params:{
    location: 'zh-cn'
}});
export default class Pixabay{
    apiKey = '';
    axios = null;

    constructor(apiKey, axios) {
        this.apiKey = apiKey;
        this.axios = axios;
    }

    async search(q, page = 1) {
        console.log( this.axios);
        let url = `https://pixabay.com/api/?key=${this.apiKey}&q=${q}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`;
        let res = await this.axios.get(url);
        
        if (res.status !== 200) {
            return [];
        }

        let respObj = res.data;

        if (!respObj.hasOwnProperty('hits')) {
            return [];
        }

        return respObj.hits;
    }
}

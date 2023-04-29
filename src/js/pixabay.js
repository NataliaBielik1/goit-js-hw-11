export default class Pixabay{
    apiKey = '';

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async search(q, page = 1) {
        let url = `https://pixabay.com/api/?key=${this.apiKey}&q=${q}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`;
        let res = await fetch(url);

        if (res.status !== 200) {
            return [];
        }

        let respObj = await res.json();

        if (!respObj.hasOwnProperty('hits')) {
            return [];
        }

        return respObj.hits;
    }
}

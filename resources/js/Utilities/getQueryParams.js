const getQueryParams = (stringUrl) => {
    const url = new URL(stringUrl === undefined ? document.URL : stringUrl);
    const params = new URLSearchParams(url.search);
    const queryParams = {};

    for (const [key, value] of params) {
        queryParams[key] = value;
    }

    return queryParams;
};

export default getQueryParams;

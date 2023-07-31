const htmlEntityDecode = (inputString) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(
        `<!doctype html><body>${inputString}`,
        "text/html"
    ).body.textContent;
    return decodedString;
};

export default htmlEntityDecode;

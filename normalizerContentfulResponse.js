function normalizeContentfulResponse(params) {
    if (Array.isArray(params)) {
        return params.map(el => {
            if (el.hasOwnProperty('fields')) {
                return normalizeContentfulResponse(el.fields);
            }
            return el;
        });
    }
  
    let data = {...params};
  
    if (data.hasOwnProperty('fields')) {
        data = { ...params.fields };
    }
  
    for (const [key, value] of Object.entries(data)) {
        if (isObject(value) || Array.isArray(value)) {
            data = {...data, [key]: normalizeContentfulResponse(value)}
        } else {
            data = { ...data, [key]: value }
        }
    }
  
    return data;
  }

  export default normalizeContentfulResponse;
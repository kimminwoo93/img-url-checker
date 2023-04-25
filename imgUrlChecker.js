// module
const http = require('http');
const https = require('https');

/**
 * Check the availability of image links
 * 
 * @param {String} url
 * @returns Promise
 */
const imgUrlChecker = (url) => {
    // image url
    let imgUrl = url;
    
    // http or https
    const scheme = imgUrl.startsWith('https://') ? https : http;
    
    return new Promise((resolve, reject) => {
        // HTTP request
        scheme.get(imgUrl, (res) => {
            let imgData = '';

            if(res.statusCode !== 200) {
                console.error('Fail');
                console.log('Status code: ' + res.statusCode);

                // set default image url
                // i.e. imgUrl = 'https://example.com/profile/default.png';
                imgUrl = '';

                resolve(imgUrl);
            }

            res.setEncoding('binary');

            res.on('data', (chunk) => {
                imgData += chunk;
            });

            res.on('end', () => {
                if(imgData.length === 0) {
                    console.log('No image');

                    // set default image url
                    // i.e. imgUrl = 'https://example.com/profile/default.png';
                    imgUrl = '';

                    resolve(imgUrl);
                }

                console.log('Success');

                resolve(imgUrl);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

// IIFE(Immediately Invoked Function Expression)
(async () => {
    try {
        // i.e. imgUrlChecker('https://example.com/profile/john.png');
        const img = await imgUrlChecker();
        
        console.info('Image url: ' + img);
    } catch(err) {
        console.error('Error');
        console.info(err);
    }
})();
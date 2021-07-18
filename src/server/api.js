import express from 'express'
import Parser from 'rss-parser'

//collection of current subscribed RSS feeds
let rssList = new Set();
rssList.add('https://news.ycombinator.com/rss');
rssList.add('https://blog.experientia.com/feed/');
rssList.add('https://medium.com/feed/datasociety-points/tagged/health');
rssList.add('https://fuckiwishiknewth.at/feed/');
rssList.add('https://uxdesign.cc/feed');
rssList.add('https://www.technologyreview.com/feed/');
rssList.add('http://feeds2.feedburner.com/Swissmiss');
rssList.add('https://www.pentagram.com/feed');
rssList.add('https://www.creativeboom.com/feed/');
rssList.add('https://www.creativereview.co.uk/feed/');



//create new RSS parser
let parser = new Parser();

export default server => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const result = [];
            for (const url of rssList) {
                const feed = await parser.parseURL(url);
                result.push(feed);
            }
            res.send(result);
        } catch (e) {
            next(e);
        }
    });



    // // Add Method
    // router.post('/add', (req, res) => {
    //     const { url } = req.body;

    //     if (rssList.has(url)) {
    //         res.send({ added: false, rssList: [...rssList] });
    //         return;
    //     }

    //     rssList.add(url);
    //     res.send({ added: true, rssList: [...rssList] });
    // });

    // // List Method
    // router.get('/list', (req, res) => {
    //     res.send([...rssList]);
    // });

    // // Refresh Method
    // router.get('/refresh', async (req, res, next) => {
    //     try {
    //         const result = [];
    //         for (const url of rssList) {
    //             const feed = await parser.parseURL(url);
    //             result.push(feed);
    //         }
    //         res.send(result);
    //     } catch (e) {
    //         next(e);
    //     }
    // });

    return router;
}
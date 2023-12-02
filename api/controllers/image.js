

const handleApiCall = (req, res) => {

    const returnClarifyRequestOptions = (imageURL) => {

        const PAT = '00ae678cd98341b1bdc3bd87cf1a839c';
        const USER_ID = 'lundydundy';       
        const APP_ID = 'faceapp';
    
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": imageURL
                        }
                    }
                }
            ]
        });
    
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
    }
    
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifyRequestOptions(req.body.input))
    .then(resp => resp.json())
    .then(data => {
        res.json(data);
    })
    .catch(err => console.log('Unable to work with api'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json("Unable to get entries"))
}

module.exports={
    handleImage,
    handleApiCall
}
const estimateBtn = document.getElementById('estimate-btn');
const reportBtn = document.getElementById('report-btn');


const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};




const createReport = () => {
	let params = new URLSearchParams(document.location.search.substring(1));
	let oid = parseInt(params.get("objectId"));
	let token = params.get("token");
	console.log(oid);
	console.log(token);
	sendHttpRequest('POST', 'https://survey123.arcgis.com/api/featureReport/createReport/submitJob', {
	featureLayerUrl: 'https://services.arcgis.com/V3rkP5g6N5bDtF74/ArcGIS/rest/services/Pursuits_2024/FeatureServer/0',
	queryParameters: '{"objectIds":"' + oid + '","orderByFields":"||EditDate DESC, objectid ASC"}',
	templateItemId: '91ad5602a0094532b0216ad75965c96f',
	token: token,
	surveyItemId: 'fe4821c6a69c404e8553aea514d1f2dc',
	outputFormat: 'pdf'
	})
		.then(responseData => {
		console.log(responseData);
		checkJobStatus(responseData['jobId'], token);
	})
		.catch(err => {
		console.log(err);
	});

  
};



reportBtn.addEventListener('click', createReport);

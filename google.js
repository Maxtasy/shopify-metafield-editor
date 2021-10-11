// Here we use a google service account to fetch the data from google api

const { google } = require('googleapis');

// @param array: array with arrays of table rows
const makeJson = (array) => {
  // make objects from row array data
  const resArr = array.reduce((acc, row, rowIdx, arr) => {
    if (rowIdx === 0) return []; //skip first row as it is table head
    const obj = {};
    row.forEach((col, colIdx) => {
      obj[arr[0][colIdx]] = row[colIdx];
    });
    return [...acc, obj];
  }, []);

  // transform object keys with a . as subkey and with .number as subarray
  const resArrTransformed = resArr.map((obj) => {
      Object.keys(obj).forEach(function(k) {
      var prop = k.split('.'); //split on . to get elements
      if(prop.length >1){ //If there is no dot just key the value as is.
          let data = obj;//Copy the default object to data in each loop
          for(i=0;i<prop.length-1;i++){
              if(data[prop[i]]){ // Check if the key exists
                  if((prop[i+1].match(/^\d+$/) && !Array.isArray(data[prop[i]])) // Check if the next key is a digit and the object we have is a JSON
                      || (!prop[i+1].match(/^\d+$/) && Array.isArray(data[prop[i]]))){ // Check if the next key is not a digit and the object we have is a Array
                          throw new Error('Invalid header data'); //If any of the above cases satisfy we cannot add the key so we can throw an error.
                  }
                  data  = data[prop[i]]; // If key exisits make the data variable as the value of the key
              }else {
                  if(prop[i+1].match(/^\d+$/)){ //If the key is not available see if the next parameter is a digit or string to decide if its array or string
                      data[prop[i]]  =  [];
                  }else{
                      data[prop[i]]  =  {};
                  }
                  data = data[prop[i]];  //Assign this new object to data
              }
          };
          data[prop[i]] = obj[k];  //Finally add the value to final key
          delete obj[k]; // delete the exisiting key value
      }
    });
  return obj;
  })

  return resArrTransformed;
}

// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get
const getMetafieldsFromSheet = async (spreadsheetId, sheetName) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './keys.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
  });

  const authClient = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: authClient });
  
  try {
    const readData = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: [sheetName],
    });
    return makeJson(readData.data.values);
  } catch (error) {
    console.log(error);
  }
};

const getSheetList = async (spreadsheetId) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './keys.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
  });

  const authClient = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: authClient });
  
  try {
    const readData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId
    });
    return readData.data.sheets;
  } catch (error) {
    console.log(error);
  }
}

async function delay(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}

const getMetafieldsFromGoogle = async (spreadsheetId) => {
  // get a list of all sheet names
  const sheets = await getSheetList(spreadsheetId);
  const sheetNames = sheets.map((sheet) => sheet.properties.title);

  const allMetafields = await Promise.all(sheetNames.map(async (sheetName) => {
    const metafields = await getMetafieldsFromSheet(spreadsheetId, sheetName);
    await delay(1000);
    return metafields;
  }))

  const singleArrayMetafields = [];
  allMetafields.forEach((field) => singleArrayMetafields.push(...field))

  return singleArrayMetafields;     
}

module.exports = { getSheetList, getMetafieldsFromGoogle }

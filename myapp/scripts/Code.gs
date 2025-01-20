function doGet(e) {
  var page = e?.parameter.page || 1;
  var limit = e?.parameter.limit || 10;
  var sortBy = Number(e?.parameter.sortby) || 1;
  var sortByOrder = e?.parameter.sortbyorder || 'ascending';
  var search = e?.parameter.search;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getDataRange();
  var response = {}
  response.header = range.getValues().find(item => item[0] == 'Domain');
  range.sort([{column:sortBy, ascending: sortByOrder == 'ascending'}]);
  var data = range.getValues();
  if (search!=null) {
    data = data.filter(item => {
      return item[0].includes(search)
    })
  }
  response.rows = data.splice(limit * (page - 1), limit);
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

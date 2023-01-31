// default version list in case of JSON loading issue
let versions = {
  versions: {
    en: ["latest"]
  }
};
const cleanSiteUrl = site_root.replace(/\/+$/i, '');

// is the version passed as param the one displayed accoring to the url
function isDisplayedVersion(version){
  return site_current_version === version;
}

// -1 = sort a before b
const sortAB = -1
// 1 = sort b before a
const sortBA = 1
// 0 = sort a and b as they were provided
const sortDefaultBA = 0

// compare two semVer or calVer versions must only contain numbers and dots
function compareVersions(a, b) {
  const separator = '.'
  if (typeof a !== 'string') return false
  if (typeof b !== 'string') return false
  a = a.split(separator)
  b = b.split(separator)
  const shortestVersionLength = Math.min(a.length, b.length)
  // compare each segment of both version array
  for (let i = 0; i < shortestVersionLength; ++i) {
    a[i] = parseInt(a[i], 10)
    b[i] = parseInt(b[i], 10)
    if (a[i] > b[i]) return sortBA
    if (a[i] < b[i]) return sortAB
  }
  // if no difference between compared segments
  // compare versions array length:
  // same length = same version
  // longer is greater, ex. 1.2.3.4 greater than 1.2.3
  return a.length === b.length
      ? sortDefaultBA
      : a.length < b.length
          ? sortAB
          : sortBA
}

function sortVersions (versionsList) {
  versionsList.sort(function (a, b) {
    // check if one is the "latest", always greater than stable or tags
    if ('latest' === a) return sortAB
    if ('latest' === b) return sortBA
    // once none is "latest", check if one is the "stable", always greater than tags
    if ('stable' === a) return sortAB
    if ('stable' === b) return sortBA
    // compare tag versions, reverted order
    const descOrder = -1
    return compareVersions(a, b) * descOrder
  })

  return versionsList
}

// Update the drop down list and set active version
function updateVersionsDropDown(versions, currentLanguage, currentVersion){
  $("#__version").empty();
  const versionsList = sortVersions(versions.versions[currentLanguage]);
  $.each( versionsList, function( index, version ) {
    var item = $( `<option value="${version}">${version}</option>" `);

    if(isDisplayedVersion(version)){
      item.attr("selected","selected");
      document.title = `${document.title} - ${version}`;
    }

    item.appendTo("#__version");
  });
}

// set the global versions value from the Json file,
// update dropdown on completions
function getVersionsFromJsonFile(){
  $.ajaxSetup({ cache: false });
  $.getJSON( `${cleanSiteUrl}/versions.json` , function( data ) {
    if(!jQuery.isEmptyObject(data)){ versions = data; }
  })
  .always(
    function() {
      updateVersionsDropDown(versions, site_current_language, site_current_version);
    }
  );
}

$(function() {
  getVersionsFromJsonFile();
});

$('#__version').change(function(){
  const targetVersion = $(this).val();
  console.log(targetVersion);
  window.location.href = cleanSiteUrl + "/" + site_current_language + "/" + targetVersion;
  return false
});

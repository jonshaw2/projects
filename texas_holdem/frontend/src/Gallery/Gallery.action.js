import $ from 'jquery';
import BASEURL from '../baseurl';

function galleryInfo(data){

  return {type: 'gallery_initiate', payload: data};
}
function galleryError(resp){
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  console.log(error);
}

export function getGallery(){
  let asyncAction = function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/tables`,
      method: 'get',
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .then(data => dispatch(galleryInfo(data)))
    .catch(resp => dispatch(galleryError(resp)))
  };
  return asyncAction
}

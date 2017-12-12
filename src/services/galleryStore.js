import {getClient} from './cdnClient'

export function loadGalleries (contentTypeId) {
  return getClient().readMediaAlbumFolder('').then(payload => {
    return payload
  })
}

export function loadGallery (id) {
  return getClient().readDetailMediaAlbumFiles('id:' + id).then(payload => {
    return {items: payload.items, galleryId: payload.album_id, galleryTitle: payload.album_name}
  })
}

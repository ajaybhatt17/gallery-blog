import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './GalleryThumb.css'
import Date from './Date'
import Location from './Location'
import ResponsiveImage from './ResponsiveImage'

function GalleryThumb ({ gallery }) {

  return (
    <div styleName="c-galleryThumb">
      <figure styleName="c-galleryThumb__figure">
        <Link to={`/gallery/${gallery.album_id}`} styleName="c-galleryThumb__imageContainer">
          <ResponsiveImage src={ gallery.entries[0].url } alt={ `Open Gallery ${gallery.entries[0].title}` }/>
        </Link>

        <figcaption styleName="c-galleryThumb__caption">
          <div styleName="c-galleryThumb__title">{ gallery.album_name }</div>

          <div className="u-marginBottomSmall">
          </div>

          { renderTags(gallery) }

          <div className="u-marginBottomSmall u-flexHorizCenter">
            <Date entry={ '' } />
            <Location entry={ '' } />
          </div>

        </figcaption>
      </figure>
      <div className="u-flexHorizCenter u-marginTopAuto u-marginBottomDefault u-paddingHorizDefault">
        <Link to={`/gallery/${gallery.album_id}`} className="o-btnPrimary">View gallery</Link>
      </div>
    </div>
  )
}

function renderTags (gallery) {
  if (gallery.tags) {
    return (
      <ul className="o-listReset">
      {
        gallery.tags.map(
          (entry, index) => (<li key={index} className="o-tag">{ entry }</li>)
        )
      }
      </ul>
    )
  }
}

GalleryThumb.propTypes = { gallery: PropTypes.object }

export default CSSModules(GalleryThumb, styles)

import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Gallery.css'
import ResponsiveImage from './ResponsiveImage'
import { Link, browserHistory } from 'react-router'
import Modal from 'react-modal'
import Author from './Author'
import Date from './Date'
import Location from './Location'
import ImageGallery from 'react-image-gallery'
import { connectComponent } from '../store'

const customStyles = {
  content: {
    position: 'static',
    left: 'auto',
    padding: 0,

    border: 'none',
    borderRadius: 0,
    overflow: 'visible',

    boxShadow: '0 .5em 3em #ddd'
  }
}

class Gallery extends React.Component {

  componentDidMount () {
    this.props.loadGallery(this.props.params.galleryId)
  }

  closeModal () {
    browserHistory.goBack()
  }

  getIndexOfImage (imageCollection, id) {
    let foundIndex = -1

    imageCollection.some((item, index) => {
      if (item.id === id) {
        foundIndex = index

        return true
      }
    })

    return foundIndex
  }

  componentWillReceiveProps () {
    let gallery = this.props.galleries.entries[ this.props.params.galleryId ]

    if (gallery && gallery.error) {
      browserHistory.push('/not-found')
    }
  }

  renderImageEntry (entry) {
    return (
      <div>
        <ResponsiveImage
            src={entry.url}
            alt={entry.title}
        />

        <div className="image-gallery-description">
          {
            entry.title &&
              <div className="image-gallery-title">
                {entry.title}
              </div>
          }
          {
            entry.imageCaption &&
              <div className="u-marginBottomDefault">
                {entry.imageCaption}
              </div>
          }
          {
            entry.imageCredits &&
              <div>
                {entry.imageCredits}
              </div>
          }
        </div>
      </div>
    )
  }

  render () {
    const gallery = this.props.galleries.entries[ this.props.params.galleryId ]
    if (gallery && gallery.items) {
      return (
        <div>
          <div styleName="c-gallery__header">
            <h1 styleName="c-gallery__headline">{ gallery.galleryTitle }</h1>
            <Link to={'/'} styleName="c-gallery__close" className="o-btnClose" aria-label="Go back to all galleries">
              ✕
            </Link>
            { this.renderTags(gallery) }

            <div className="u-marginBottomSmall u-flexHorizCenter">
              <Date entry={ '' } />
              <Location entry={ '' } />
            </div>
          </div>

          <ul className="o-listThirds">
            {
              gallery.items.map((entry, index) => {
                return (
                  <li key={entry.id}>
                    <div styleName="c-gallery__modalOpenLink">
                      <Link to={`/gallery/${gallery.galleryId}/image/${entry.id}`} >
                        <ResponsiveImage src={ entry.url } alt={entry.title} />
                      </Link>
                      <div styleName="c-gallery__modalOpenTitle">{ entry.title }</div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <Modal
            isOpen={!!this.props.params.imageId}
            onRequestClose={this.closeModal}
            style={customStyles}>
            <button onClick={this.closeModal.bind(this)} styleName="c-gallery__modalClose" className="o-btnClose"><span>✕</span></button>

            <ImageGallery
            ref={i => this._imageGallery = i}
            items={ gallery.items }
            slideInterval={2000}
            startIndex={ this.props.params.imageId ? this.getIndexOfImage(gallery.items, this.props.params.imageId) : -1}
            onImageLoad={this.handleImageLoad}
            renderItem={this.renderImageEntry}/>
          </Modal>
        </div>
      )
    }
  }

  renderTags (gallery) {
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
}

Gallery.propTypes = {
  app: PropTypes.object,
  galleries: PropTypes.object,
  loadGallery: PropTypes.func,
  loadGalleries: PropTypes.func,
  params: PropTypes.object
}

export default connectComponent(CSSModules(Gallery, styles))

import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import CITIES from '../../cities';
import Offer from '../../types/offer-type.js';
import {getCurrentOffer} from '../../reducer/selectors.js';

class Map extends React.PureComponent {

  constructor(props) {
    super(props);

    this.map = null;
    this.leaflet = null;
  }

  componentDidMount() {
    const {mapData, leaflet, activeCity} = this.props;
    this.leaflet = leaflet;
    this.map = this.leaflet.map(`map`, {
      center: CITIES[activeCity],
      zoom: mapData.zoom,
      zoomControl: mapData.isZoom,
      marker: mapData.isMarker
    });

    this._buildMap();
  }

  componentDidUpdate() {
    this.map.eachLayer((layer) => {
      this.map.removeLayer(layer);
    });

    this._buildMap();
  }

  _buildMap() {
    const {activeCity, mapData, offers, currentOffer} = this.props;
    const cityCenter = CITIES[activeCity];
    const {zoom} = mapData;

    this.leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
    this.map.setView(cityCenter, zoom);
    for (const offer of offers) {

      this._addPin({offerCoordinates: offer.coordinates, activeOffer: offer.id === (currentOffer && currentOffer.id)});
    }
  }

  _addPin({offerCoordinates, activeOffer}) {
    const {mapData: {iconUrl, iconUrlCurrent, iconSize}} = this.props;
    const icon = this.leaflet.icon({
      iconUrl: activeOffer ? iconUrlCurrent : iconUrl,
      iconSize,
    });

    this.leaflet
      .marker(offerCoordinates, {icon})
      .addTo(this.map);
  }

  render() {
    return <section className={`${this.props.className}__map map`}>
      <div id="map" style={{height: `100%`}}></div>
    </section>;
  }
}

Map.propTypes = {
  className: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(Offer).isRequired,
  mapData: PropTypes.shape({
    city: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
    isZoom: PropTypes.bool.isRequired,
    isMarker: PropTypes.bool.isRequired,
    iconUrl: PropTypes.string.isRequired,
    iconSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  leaflet: PropTypes.object.isRequired,
  activeCity: PropTypes.string.isRequired,
  currentOffer: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    currentOffer: getCurrentOffer(state),
  });
};

export {Map};
export default connect(mapStateToProps)(Map);

import React from 'react'

var Car = ({ value, onClick }) => <div onClick={onClick}>{value}</div>

var CarList = React.createClass({
  getInitialState: function() {
    return {
      cars: [
        'Volvo',
        'Saab',
        'BMW',
        'Tesla',
        'Mercedes',
        'Fiat',
        'Renault',
        'Lada',
        'Opel'
      ],
      selectedCar: null,
      history: null
    }
  },

  setSelectedCar: function(selectedCar) {
    this.setState(state => ({
      selectedCar: selectedCar,
      history: Object.assign({}, state.history, selectedCar.id)
    }))
  },

  renderCars: function() {
    var cars = this.cars.map(car => (
      <Car
        value={car}
        onClick={function(e) {
          this.setSelectedCar(e.target.value)
        }.bind(this)}
      />
    ))

    return cars
  },

  renderBestCarMessage: function() {
    var message = 'No cars'
    if (cars.length) {
      var randomCar = null
      message = 'The best car is ' + randomCar
    }
    return message
  },

  render: function() {
    return (
      <div>
        {this.renderCars()}
        {this.renderBestCarMessage()}
      </div>
    )
  }
})

export default CarList

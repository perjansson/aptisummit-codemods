import React from 'react'

class Car extends Component {
  render() {
    return <div onClick={onClick}>{value}</div>;
  }
}

class CarList extends React.Component {
  state = {
    cars: [
      'Volvo',
      'Saab',
      'BMW',
      'Tesla',
      'Mercedes',
      'Fiat',
      'Renault',
      'Lada',
      'Opel',
    ],
    selectedCar: null,
    history: null
  };

  setSelectedCar = (selectedCar) => {
    this.setState(state => ({
      selectedCar,
      history: {
        ...state.history,
        ...selectedCar.id
      }
    }))
  };

  renderCars = () => {
    const cars = this.cars.map(car => (
      <Car
        value={car}
        onClick={e => {
          this.setSelectedCar(e.target.value)
        }}
      />
    ));

    return cars
  };

  renderBestCarMessage = () => {
    let message = 'No cars';
    if (cars.length) {
      const randomCar = null;
      message = `The best car is ${randomCar}`
    }
    return message
  };

  render() {
    return (
      <div>
        {this.renderCars()}
        {this.renderBestCarMessage()}
      </div>
    )
  }
}

export default CarList

const app = angular.module('CandleApp', [])

app.controller('MyController', ['$http', function ($http) {
  this.indexToShow = null
  this.indexToShowDescription = null
  this.createForm = {}
  this.showCreate = false
  this.floatingDescription = ''
  this.toggleClass = true

  this.toggleCreateForm = function () {
    this.showCreate = !this.showCreate
  }

  this.showDescription = function (candle, $index) {
    this.indexToShowDescription = $index
    this.floatingDescription = candle.description
  }

  this.unshowDescription = function (candle, $index) {
    this.floatingDescription = ''
  }




  this.createCandle = () => {
    $http(
      {
        method:'POST',
        url:'/candles',
        data: this.createForm
      }
    ).then((response) => {
      console.log(response.data);
      this.createForm = {}
      this.getCandles()
    }, (error) => {
      console.log(error);
    })
  }//createCandle end


  this.getCandles = () => {
    $http(
      {
        method:'GET',
        url: '/candles'
      }
    ).then((response) => {
      this.candles = response.data
    }, (error) => {
      console.log(error);
    })
  }//getCandles end


  this.deleteCandle = (id) => {
    $http(
      {
        method: 'DELETE',
        url: '/candles/' + id
      }
    ).then((response) => {
      this.getCandles()
    }, (error) => {
      console.log(error);
    })
  }//deleteCandle end

  this.updateCandle = (candle) => {
    $http(
      {
        method: 'PUT',
        url: '/candles/' + candle._id,
        data: {
          name: this.name,
          description: this.description,
          price: this.price,
          brand: this.brand,
          likes: this.likes,
          inStock: this.inStock,
          img: this.url
        }
      }
    ).then((response) => {
      console.log(response.data);
      this.getCandles()
    }, (error) => {
      console.log(error);
    })
  }

  this.addLikes = function (candle) {
    console.log(candle);
    $http(
      {
        method:"PUT",
        url: '/candles/likes/' + candle._id
      }
    ).then(
      {
        function (response) {
          this.getCandles()
        },
        function (error) {
          console.log(error);
        }
      }
    )
  }


  this.getCandles()


}])

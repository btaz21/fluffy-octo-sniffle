const app = angular.module('CandleApp', [])

app.controller('MyController', ['$http', function ($http) {
  this.indexToShow = null
  this.indexToShowDescription = null
  this.createForm = {}
  this.showBoolean = false
  this.editBoolean = false
  this.floatingDescription = ''
  const controller = this

  this.toggleCreateForm = function () {
    this.showBoolean = !this.showBoolean
  }

  this.toggleEditForm = function () {
    this.editBoolean = !this.editBoolean
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
    ).then(
      function (response) {
        console.log(response.data);
        controller.createForm = {}
        controller.getCandles()
      },
      function (error) {
        console.log(error);
      }
    )
  }


  this.getCandles = () => {
    $http(
      {
        method:'GET',
        url: '/candles'
      }
    ).then(
      function (response) {
        controller.candles = response.data
      },
      function (error) {
        console.log(error);
      }
    )
  }



  this.deleteCandle = (id) => {
    $http(
      {
        method: 'DELETE',
        url: '/candles/' + id
      }
    ).then(
      function (response) {
        controller.getCandles()
      },
      function (error) {
        console.log(error);
      }
    )
  }


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
          img: this.img
        }
      }
    ).then(
      function (response) {
        controller.getCandles()
        controller.indexToShow = null
      },
      function (error) {
        console.log(error);
      }
    )
  }

  this.addLikes = function (candle) {
    console.log(candle);
    $http(
      {
        method:"PUT",
        url: '/candles/likes/' + candle._id
      }
    ).then(
        function (response) {
          controller.getCandles()
        },
        function (error) {
          console.log(error);
        }
    )
  }


  this.getCandles()





}])
